import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI | null = null;
  private readonly modelName = 'gemini-2.5-flash';

  constructor() {
    if (process && process.env && process.env.API_KEY) {
      try {
        this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      } catch (error) {
        console.error("Failed to initialize GoogleGenAI:", error);
      }
    } else {
      console.warn("Gemini API Key (process.env.API_KEY) is not available. GeminiService will not function.");
    }
  }

  public async generateText(prompt: string): Promise<string> {
    if (!this.ai) {
      throw new Error("Gemini API client is not initialized. Check API Key configuration.");
    }

    try {
      const response: GenerateContentResponse = await this.ai.models.generateContent({
        model: this.modelName,
        contents: prompt,
      });
      
      const textOutput = response.text;
      if (typeof textOutput !== 'string') {
        console.error("Unexpected response format from Gemini API:", response);
        throw new Error("Received an unexpected response format from the AI.");
      }
      return textOutput;
    } catch (error: any) {
      console.error("Error generating text with Gemini API:", error);
      if (error.message && error.message.includes("API key not valid")) {
        throw new Error("The provided API key is not valid. Please check your configuration.");
      }
      if (error.message && error.message.toLowerCase().includes("quota")) {
         throw new Error("You have exceeded your API quota. Please check your Google AI Studio account.");
      }
      throw new Error(`Failed to generate text from AI: ${error.message || 'Unknown error'}`);
    }
  }

  public async * generateTextStream(prompt: string): AsyncGenerator<string, void, unknown> {
    if (!this.ai) {
      throw new Error("Gemini API client is not initialized. Check API Key.");
    }

    try {
      const stream = await this.ai.models.generateContentStream({
        model: this.modelName,
        contents: prompt,
      });

      for await (const chunk of stream) {
        const chunkText = chunk.text;
        if (typeof chunkText === 'string') {
          yield chunkText;
        }
      }
    } catch (error: any) {
      console.error("Error generating text stream with Gemini API:", error);
      throw new Error(`Streaming failed: ${error.message || 'Unknown error'}`);
    }
  }
  
  public async generateJsonData<T,>(prompt: string): Promise<T> {
    if (!this.ai) {
      throw new Error("Gemini API client is not initialized. Check API Key configuration.");
    }

    try {
      const response: GenerateContentResponse = await this.ai.models.generateContent({
        model: this.modelName,
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });
      
      let jsonStr = response.text.trim();
      const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
      const match = jsonStr.match(fenceRegex);
      if (match && match[2]) {
        jsonStr = match[2].trim();
      }
      
      return JSON.parse(jsonStr) as T;

    } catch (error: any) {
      console.error("Error generating JSON data with Gemini API:", error);
      if (error instanceof SyntaxError) {
        throw new Error("Failed to parse JSON response from AI. The format might be invalid.");
      }
      throw new Error(`Failed to generate JSON data from AI: ${error.message || 'Unknown error'}`);
    }
  }
}