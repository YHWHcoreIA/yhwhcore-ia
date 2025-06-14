import { GoogleGenAI, GenerateContentResponse, Chat, Content, Part } from "@google/genai";
import { GeneratedImageDetail } from '../types'; // Import the new type

// API Key is now accessed via process.env.API_KEY

export const geminiService = {
  generateText: async (prompt: string, modelName: string): Promise<string> => {
    if (!process.env.API_KEY) {
      throw new Error("API key is not configured. Set process.env.API_KEY in your environment.");
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: modelName,
        contents: prompt,
      });
      
      let text = response.text.trim();
      
      const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
      const match = text.match(fenceRegex);
      if (match && match[2]) {
        text = match[2].trim();
      }
      
      return text;
    } catch (error) {
      console.error("Gemini API error (generateText):", error);
      throw error;
    }
  },

  generateImages: async (prompt: string, modelName: string): Promise<GeneratedImageDetail[]> => {
    if (!process.env.API_KEY) {
      throw new Error("API key is not configured. Set process.env.API_KEY in your environment.");
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      // The direct response from ai.models.generateImages matches the structure { generatedImages: GeneratedImageDetail[] }
      const response = await ai.models.generateImages({
        model: modelName,
        prompt: prompt,
        config: { numberOfImages: 1, outputMimeType: 'image/jpeg' },
      });
      return response.generatedImages;
    } catch (error) {
      console.error("Gemini API error (generateImages):", error);
      throw error;
    }
  },

  startChat: (modelName: string, systemInstruction?: string): Chat => {
     if (!process.env.API_KEY) {
      throw new Error("API key is not configured for chat. Set process.env.API_KEY in your environment.");
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const config: { systemInstruction?: string; tools?: any[] } = {};
    if (systemInstruction) {
      config.systemInstruction = systemInstruction;
    }
    // Example: To enable search grounding (if needed for a specific chat use case)
    // config.tools = [{googleSearch: {}}];
    
    return ai.chats.create({
      model: modelName,
      // The config is same as models.generateContent config.
      config: config,
    });
  },

  sendMessageStream: async (chat: Chat, message: string | Part | (string | Part)[]): Promise<AsyncIterable<GenerateContentResponse>> => {
    // API key check is done when chat is started or within chat instance methods implicitly
    try {
      const result = await chat.sendMessageStream({message: message});
      return result;
    } catch (error) {
      console.error("Gemini API error (sendMessageStream):", error);
      throw error;
    }
  },
};