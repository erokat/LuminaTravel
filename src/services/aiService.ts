import { GoogleGenAI, Type, FunctionDeclaration, Content } from "@google/genai";
import { hotels, tours, destinations } from "../data/mockData";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

const navigateToPageTool: FunctionDeclaration = {
  name: "navigateToPage",
  description: "Navigates the user to a main page of the website.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      page: {
        type: Type.STRING,
        description: "The name of the page to navigate to.",
        enum: ["Home", "Destinations", "Hotels", "Tours", "Flights"],
      },
    },
    required: ["page"],
  },
};

const navigateToDetailTool: FunctionDeclaration = {
  name: "navigateToDetail",
  description: "Navigates the user to a specific detail page for a hotel, tour, or destination.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      type: {
        type: Type.STRING,
        description: "The type of item to view.",
        enum: ["hotel", "tour", "destination"],
      },
      id: {
        type: Type.STRING,
        description: "The unique ID of the item from the catalog (e.g., 'burj-al-arab', 'dubai', 'tokyo').",
      },
    },
    required: ["type", "id"],
  },
};

const setSearchParametersTool: FunctionDeclaration = {
  name: "setSearchParameters",
  description: "Sets the search parameters like Check-in, Check-out dates and Guest counts (adults, children). Call this when the user mentions their travel dates or who they are traveling with.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      checkIn: {
        type: Type.STRING,
        description: "Check-in date in format MMM DD, YYYY (e.g. Aug 12, 2026)",
      },
      checkOut: {
        type: Type.STRING,
        description: "Check-out date in format MMM DD, YYYY (e.g. Aug 19, 2026)",
      },
      adults: {
        type: Type.NUMBER,
        description: "Number of adults",
      },
      children: {
        type: Type.NUMBER,
        description: "Number of children",
      }
    },
  },
};

export interface AIResponse {
  text: string;
  functionCalls?: any[];
}

async function askOpenRouter(prompt: string, history: { role: 'user' | 'model', text: string }[], systemInstruction: string): Promise<AIResponse> {
  if (!OPENROUTER_API_KEY) {
    throw new Error("OpenRouter API key is not configured.");
  }

  const messages = [
    { role: "system", content: systemInstruction },
    ...history.map(m => ({
      role: m.role === 'user' ? 'user' : 'assistant',
      content: m.text
    })),
    { role: "user", content: prompt }
  ];

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": window.location.origin,
      "X-Title": "Lumina Elite Travel"
    },
    body: JSON.stringify({
      model: "google/gemini-3-flash-exp:free",
      messages,
      tools: [
        { type: "function", function: navigateToPageTool },
        { type: "function", function: navigateToDetailTool },
        { type: "function", function: setSearchParametersTool }
      ],
      tool_choice: "auto"
    })
  });

  const data = await response.json();
  if (data.error) throw new Error(data.error.message);

  const message = data.choices[0].message;
  const functionCalls = message.tool_calls?.map((tc: any) => ({
    name: tc.function.name,
    args: JSON.parse(tc.function.arguments)
  }));

  return {
    text: message.content || "",
    functionCalls
  };
}

export async function askAI(prompt: string, history: { role: 'user' | 'model', text: string }[] = []): Promise<AIResponse> {
  if (!GEMINI_API_KEY && !OPENROUTER_API_KEY) {
    return { text: "API keys are not configured. Please add GEMINI_API_KEY or OPENROUTER_API_KEY to your environment." };
  }

  const catalogContext = `
    КАТАЛОГ СИСТЕМЫ:
    Направления (Destinations): ${destinations.map(d => `${d.name} (id: ${d.id})`).join(", ")}
    Отели (Hotels): ${hotels.map(h => `${h.name} (id: ${h.id})`).join(", ")}
    Туры (Tours): ${tours.map(t => `${t.name} (id: ${t.id})`).join(", ")}
  `;

  const systemInstruction = `Вы — элитный и остроумный консьерж Lumina Elite Travel. 
        
  ВАШ СТИЛЬ:
  - ЯЗЫК: Безупречный РУССКИЙ.
  - ТОН: Высокий сервис, но с теплотой и харизмой. Вы — не робот, а живая легенда консьерж-сервиса.
  - ВАРИАТИВНОСТЬ: Избегайте шаблонов. Каждый ваш ответ должен звучать свежо.
  - КРАТКОСТЬ: 2-3 предложения.
  
  ИНСТРУМЕНТЫ:
  - navigateToPage: для списков (отели, туры, направления, полеты).
  - navigateToDetail: если гость выбрал конкретное место ( hotel/tour/destination ).
  - setSearchParameters: если названы даты или количество гостей.
  - КАТАЛОГ: ${catalogContext}
  
  ПРАВИЛО ОТВЕТА:
  1. Сначала элегантная фраза-подтверждение.
  2. Вызов функций без технического описания.`;

  try {
    if (!GEMINI_API_KEY) throw new Error("Gemini key missing, falling back...");

    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
    const contents: Content[] = history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));
    contents.push({ role: "user", parts: [{ text: prompt }] });

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-exp:free",
      contents,
      config: {
        systemInstruction,
        tools: [
          { googleSearch: {} },
          { functionDeclarations: [navigateToPageTool, navigateToDetailTool, setSearchParametersTool] }
        ],
        toolConfig: { includeServerSideToolInvocations: true },
      },
    });

    let rawText = "";
    const parts = response.candidates?.[0]?.content?.parts || [];
    const textPart = parts.find(p => p.text);
    if (textPart) {
      rawText = textPart.text;
    }

    const functionCalls = parts.filter(p => p.functionCall).map(p => p.functionCall);

    if (!rawText && functionCalls.length > 0) {
      const callNames = functionCalls.map(c => c.name);
      if (callNames.includes('navigateToDetail')) {
        rawText = `Мгновение, я открываю для вас подробности этого исключительного места.`;
      } else if (callNames.includes('setSearchParameters') && callNames.includes('navigateToPage')) {
        rawText = `Данные зафиксированы. Секунду, я подготовлю для вас соответствующий раздел коллекции.`;
      } else if (callNames.includes('setSearchParameters')) {
        rawText = `Отлично, я зафиксировал данные. Могу ли я предложить что-то еще?`;
      } else {
        rawText = `Секунду, я подготовлю для вас соответствующий раздел коллекции.`;
      }
    }

    if (!rawText) rawText = "К вашим услугам. Что именно вас интересует сегодня?";

    return {
      text: rawText,
      functionCalls: functionCalls.length > 0 ? functionCalls : undefined
    };
  } catch (error) {
    console.warn("Gemini Error, trying OpenRouter fallback...", error);

    if (OPENROUTER_API_KEY) {
      try {
        return await askOpenRouter(prompt, history, systemInstruction);
      } catch (orError) {
        console.error("OpenRouter Error:", orError);
      }
    }
    return { text: "Приношу свои глубочайшие извинения. Моя система связи временно перегружена. Попробуем позже?" };
  }
}