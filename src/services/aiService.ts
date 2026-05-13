import { GoogleGenAI, Type, FunctionDeclaration, Content } from "@google/genai";
import { hotels, tours, destinations } from "../data/mockData";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

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

export async function askAI(prompt: string, history: { role: 'user' | 'model', text: string }[] = []): Promise<AIResponse> {
  if (!GEMINI_API_KEY) {
    return { text: "API key is not configured. Please add it to your environment variables." };
  }

  try {
    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
    
    const catalogContext = `
      КАТАЛОГ СИСТЕМЫ:
      Направления (Destinations): ${destinations.map(d => `${d.name} (id: ${d.id})`).join(", ")}
      Отели (Hotels): ${hotels.map(h => `${h.name} (id: ${h.id})`).join(", ")}
      Туры (Tours): ${tours.map(t => `${t.name} (id: ${t.id})`).join(", ")}
    `;

    const contents: Content[] = history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    // Add the current prompt
    contents.push({ role: "user", parts: [{ text: prompt }] });

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents,
      config: {
        systemInstruction: `Вы — элитный и остроумный консьерж Lumina Elite Travel. 
        
        ВАШ СТИЛЬ:
        - ЯЗЫК: Безупречный РУССКИЙ.
        - ТОН: Высокий сервис, но с теплотой и харизмой. Вы — не робот, а живая легенда консьерж-сервиса.
        - ВАРИАТИВНОСТЬ: Избегайте шаблонов. Каждый ваш ответ должен звучать свежо. Используйте разнообразные приветствия и подтверждения.
        - КРАТКОСТЬ: 2-3 предложения. Мы ценим время гостя высокого уровня.
        
        ИНСТРУМЕНТЫ:
        - navigateToPage: используйте для списков (отели, туры, направления, полеты).
        - navigateToDetail: используйте, чтобы перевести гостя на страницу отеля, тура, или направления (ЕСЛИ ГОСТЬ НАЗВАЛ/ВЫБРАЛ КОНКРЕТНОЕ МЕСТО, СРАЗУ ВЫЗЫВАЙТЕ ЭТУ ФУНКЦИЮ).
        - setSearchParameters: ОБЯЗАТЕЛЬНО используйте, если гость называет даты, месяц, время заезда/выезда или количество гостей (взрослых/детей). Парсите всё в формат YYYY-MM-DD если возможно, либо оставляйте текущий год (например, '2026-08-12', '2026-08-19').
        - КАТАЛОГ: ${catalogContext}
        
        ПРАВИЛО ОТВЕТА:
        1. Сначала ВСЕГДА пишите элегантную фразу-подтверждение.
        2. Вызов нескольких функций обязателен, если гость дает и объект, и параметры. Обязательно вызывайте setSearchParameters, если есть любые данные по датам или людям.
        
        ЗАПРЕТ:
        - Никакого JSON в тексте.
        - Никаких технических пояснений ("я вызвал функцию").
        - Не повторяйтесь. "Чем я могу быть полезен?" — используйте только если действительно нечего сказать.`,
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
    
    if (!rawText && response.functionCalls && response.functionCalls.length > 0) {
      const callNames = response.functionCalls.map(c => c.name);
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
      functionCalls: response.functionCalls
    };
  } catch (error) {
    console.error("AI Error:", error);
    return { text: "Приношу свои извинения, у меня возникли временные трудности. Как я могу помочь вам иначе?" };
  }
}
