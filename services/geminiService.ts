import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Message, ResearchLevel, Role, GroundingSource } from "../types";
import { SYSTEM_INSTRUCTION } from "../constants";

// Helper to sanitize internal message structure to API format
const formatHistory = (history: Message[]) => {
  return history.map(msg => ({
    role: msg.role,
    parts: [{ text: msg.text }]
  }));
};

interface StreamResponse {
  text: string;
  sources: GroundingSource[];
}

export const streamGeminiResponse = async (
  prompt: string,
  history: Message[],
  level: ResearchLevel,
  onChunk: (text: string) => void,
  onComplete: (fullText: string, sources: GroundingSource[]) => void
) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    let modelName = 'gemini-2.5-flash';
    let tools: any[] = [];
    let thinkingConfig: any = undefined;

    switch (level) {
      case ResearchLevel.QUICK:
        modelName = 'gemini-2.5-flash';
        break;
      case ResearchLevel.MODERATE:
        modelName = 'gemini-2.5-flash';
        tools = [{ googleSearch: {} }];
        break;
      case ResearchLevel.DEEP:
        // Using Pro for deeper reasoning + search
        modelName = 'gemini-3-pro-preview'; 
        tools = [{ googleSearch: {} }];
        thinkingConfig = { thinkingBudget: 4096 }; // Reserve tokens for thinking
        break;
    }

    // Initialize chat with history
    const chat = ai.chats.create({
      model: modelName,
      history: formatHistory(history),
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: tools.length > 0 ? tools : undefined,
        thinkingConfig: thinkingConfig,
      }
    });

    const resultStream = await chat.sendMessageStream({ message: prompt });
    
    let fullText = "";
    let aggregatedSources: GroundingSource[] = [];

    for await (const chunk of resultStream) {
      const c = chunk as GenerateContentResponse;
      
      // Extract text
      if (c.text) {
        fullText += c.text;
        onChunk(fullText);
      }

      // Extract Grounding Metadata (Sources)
      // Note: Grounding metadata usually comes in the final chunks or consolidated
      const groundingChunks = c.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (groundingChunks) {
        groundingChunks.forEach((chunk: any) => {
          if (chunk.web?.uri && chunk.web?.title) {
            aggregatedSources.push({
              uri: chunk.web.uri,
              title: chunk.web.title
            });
          }
        });
      }
    }

    // Remove duplicates from sources
    const uniqueSources = aggregatedSources.filter((source, index, self) =>
      index === self.findIndex((t) => (
        t.uri === source.uri
      ))
    );

    onComplete(fullText, uniqueSources);

  } catch (error) {
    console.error("Gemini API Error:", error);
    onChunk("Error: Unable to connect to Veritas Intelligence Network. Please check your connection or API limit.");
    onComplete("Error encountered.", []);
  }
};
