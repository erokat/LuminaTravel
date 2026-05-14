export interface AIResponse {
  text: string;
  functionCalls?: any[];
  reasoning_details?: any;
}

export async function askAI(
  prompt: string, 
  history: { role: 'user' | 'model', text: string, functionCalls?: any[], reasoning_details?: any }[] = [],
  currentPath: string = "/"
): Promise<AIResponse> {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt, history, currentPath }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.text || `Server error: ${response.status}`);
    }

    return await response.json();
  } catch (error: any) {
    console.error("Chat API Error:", error);
    return { 
      text: "К сожалению, я столкнулся с временной заминкой при связи с нашим центром управления. Позвольте мне попробовать еще раз через мгновение." 
    };
  }
}
