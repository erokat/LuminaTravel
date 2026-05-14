import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { destinations, hotels, tours } from "./src/data/mockData";

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const catalogContext = `
    КАТАЛОГ LUMINA ELITE TRAVEL:
    
    Направления (Destinations):
    ${destinations.map(d => `- ${d.name} (id: ${d.id}). ${d.description}. Популярность: ${d.rating}/5.`).join("\n    ")}

    Отели (Hotels):
    ${hotels.map(h => `- ${h.name} (id: ${h.id}) в ${h.destinationId}. Цена: $${h.pricePerNight} за ночь. Категория: ${h.category}. Удобства: ${h.amenities.join(", ")}. Описание: ${h.description}`).join("\n    ")}

    Туры (Tours):
    ${tours.map(t => `- ${t.name} (id: ${t.id}) в ${t.destinationId}. Цена: $${t.price}. Срок: ${t.duration}. Тип: ${t.type}. Суть: ${t.description}`).join("\n    ")}
`;

const systemInstruction = `Вы — элитный персональный консьерж Lumina Elite Travel.
  
  ВАША МИССИЯ: Сопровождать каждое действие изысканным, «старым» русским языком.
  
  ПРАВИЛА ПОИСКА И НАВИГАЦИИ (СТРОГО):
  1. Если просят КОНКРЕТНЫЙ отель по имени (напр. "Canaves Oia"):
     - Вызывайте setSearchParameters(...) (установив даты/людей, если указаны).
     - ОБЯЗАТЕЛЬНО вызывайте navigateToDetail(type='hotel', id='ID') из каталога. Только так можно попасть на страницу отеля.
     
  2. Если просят "Отель в [Направление/Город]":
     - ИЩИТЕ в каталоге ниже подходящий отель. Если он есть, ВЫБИРАЙТЕ его ID.
     - Вызывайте setSearchParameters(...) (даты/люди).
     - ОБЯЗАТЕЛЬНО вызывайте navigateToDetail(type='hotel', id='ID'). Не открывайте список, если можно открыть конкретный отель.
     
  3. Если вы НЕ можете определить конкретный отель, вызывайте navigateToPage(page='Hotels').
  4. При запросе "направлений":
     - ОБЯЗАТЕЛЬНО вызывайте navigateToPage(page='Destinations').
     - Ваш ответ: 2-3 красивых предложения о том, что у нас представлены разнообразные и вдохновляющие уголки мира, которые подарят незабываемые впечатления. БЕЗ ПЕРЕЧИСЛЕНИЯ СПИСКА.
     - КАТЕГОРИЧЕСКИ ЗАПРЕЩЕНО выводить список направлений из КАТАЛОГА в ответе.
  
  ГОСТИ: По умолчанию adults=2.
  ДАТЫ (2026): "24 мая" = "2026-05-24". "на X дней" -> вычисляйте checkOut.
  
  КАТЕГОРИЧЕСКИЙ ЗАПРЕТ:
  - Никогда не упоминайте инструменты в ответе.
  - Если запрос подразумевает выбор отеля, открывайте страницу отеля (navigateToDetail).

  КАТАЛОГ (ДЛЯ ВНУТРЕННЕГО ПОИСКА ID, НЕ ВЫВОДИТЬ В ОТВЕТ!):
  ${catalogContext}
`;
async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  app.post("/api/chat", async (req, res) => {
    const { prompt, history, currentPath } = req.body;
    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

    if (!OPENROUTER_API_KEY && !GEMINI_API_KEY) {
      return res.status(500).json({ text: "AI Configuration error: API keys missing." });
    }

    const fullInstruction = `${systemInstruction}

ТЕКУЩИЙ КОНТЕКСТ:
- Мы на странице: ${currentPath}
- Сегодняшняя дата: ${new Date().toISOString().split('T')[0]}

ВАЖНО: Если пользователь упоминает отель или тур, вы ОБЯЗАНЫ вызвать navigateToDetail. Если даты или люди — setSearchParameters.`;

    const tools = [
      {
        name: "navigateToPage",
        description: "Переход на основные разделы сайта (Hotels, Tours, Destinations).",
        parameters: {
          type: "object",
          properties: {
            page: {
              type: "string",
              enum: ["Home", "Destinations", "Hotels", "Tours", "Flights"],
              description: "Название страницы."
            },
          },
          required: ["page"],
        },
      },
      {
        name: "navigateToDetail",
        description: "Переход на страницу конкретного отеля или тура. Используйте id из каталога.",
        parameters: {
          type: "object",
          properties: {
            type: {
              type: "string",
              enum: ["hotel", "tour", "destination"],
            },
            id: {
              type: "string",
              description: "ID из каталога (e.g. 'canaves-oia').",
            },
          },
          required: ["type", "id"],
        },
      },
      {
        name: "setSearchParameters",
        description: "Установка параметров поиска: направление, даты, количество взрослых и детей.",
        parameters: {
          type: "object",
          properties: {
            destination: { type: "string", description: "ID города/региона" },
            checkIn: { type: "string", description: "Дата заезда YYYY-MM-DD" },
            checkOut: { type: "string", description: "Дата выезда YYYY-MM-DD" },
            adults: { type: "integer", description: "Количество взрослых" },
            children: { type: "integer", description: "Количество детей" }
          },
        },
      }
    ];

    try {
      if (OPENROUTER_API_KEY) {
        // OpenAI Format for OpenRouter
        const openRouterHistory: any[] = [];
        history.forEach((msg: any) => {
          if (msg.role === 'user') {
            openRouterHistory.push({ role: 'user', content: msg.text });
          } else {
            const assistantMsg: any = { role: 'assistant', content: msg.text || "..." };
            if (msg.functionCalls && msg.functionCalls.length > 0) {
              assistantMsg.tool_calls = msg.functionCalls.map((fc: any, i: number) => ({
                id: `call_${Date.now()}_${i}`,
                type: 'function',
                function: { name: fc.name, arguments: JSON.stringify(fc.args) }
              }));
              openRouterHistory.push(assistantMsg);
              assistantMsg.tool_calls.forEach((tc: any) => {
                openRouterHistory.push({
                  role: 'tool',
                  tool_call_id: tc.id,
                  name: tc.function.name,
                  content: "Success."
                });
              });
            } else {
              openRouterHistory.push(assistantMsg);
            }
          }
        });

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
            "HTTP-Referer": process.env.APP_URL || "https://ais-build-travel.app",
            "X-Title": "Lumina Elite Travel"
          },
          body: JSON.stringify({
            model: "deepseek/deepseek-chat",
            messages: [
              { role: "system", content: fullInstruction },
              ...openRouterHistory,
              { role: "user", content: prompt }
            ],
            tools: tools.map(t => ({ type: "function", function: t })),
            tool_choice: "auto",
            temperature: 0.1,
            max_tokens: 1500
          }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error?.message || `OpenRouter error: ${response.status}`);

        const choice = data.choices[0];
        let responseText = choice?.message?.content || "";
        let functionCalls: any[] = [];

        if (choice?.message?.tool_calls) {
          functionCalls = choice.message.tool_calls.map((tc: any) => ({
            name: tc.function.name,
            args: JSON.parse(tc.function.arguments)
          }));
        }

        // Clean text
        responseText = responseText.replace(/<(?:thought|reasoning|details)>[\s\S]*?<\/(?:thought|reasoning|details)>/gi, '');
        responseText = responseText.replace(/```json[\s\S]*?```/gi, '');
        responseText = responseText.trim();

        if (!responseText && functionCalls.length > 0) {
          responseText = "Я с радостью открыл для вас раздел с нашими уникальными направлениями, где каждый уголок мира готов подарить вам незабываемые впечатления.";
        }

        return res.json({ text: responseText || "Чем я могу еще помочь?", functionCalls });
      } else {
        // Gemini Direct
        const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY! });
        const geminiHistory = history.map((msg: any) => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text || "Processing..." }]
        }));

        const response = await ai.models.generateContent({
          model: "gemini-1.5-flash",
          contents: [
            ...geminiHistory,
            { role: "user", parts: [{ text: prompt }] }
          ],
          config: {
            systemInstruction: fullInstruction,
            tools: [{ 
              functionDeclarations: tools.map(t => ({
                name: t.name,
                description: t.description,
                parameters: {
                  ...t.parameters,
                  type: (t.parameters.type as string).toUpperCase() as any,
                  properties: Object.fromEntries(
                    Object.entries(t.parameters.properties).map(([k, v]: [string, any]) => [
                      k, { ...v, type: (v.type as string).toUpperCase() }
                    ])
                  )
                }
              })) 
            }],
          },
        });
        
        let responseText = response.text || "";
        const functionCalls = response.functionCalls?.map((fc: any) => ({
          name: fc.name,
          args: fc.args
        })) || [];

        responseText = responseText.replace(/```json[\s\S]*?```/g, '').trim();
        if (!responseText && functionCalls.length > 0) {
          responseText = "Я с радостью открыл для вас раздел с нашими уникальными направлениями, где каждый уголок мира готов подарить вам незабываемые впечатления.";
        }

        return res.json({ text: responseText || "Готово.", functionCalls });
      }

    } catch (error: any) {
      console.error("AI Server Error:", error);
      res.status(500).json({ text: "Приношу свои извинения, у меня возникли временные трудности с обработкой запроса." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
