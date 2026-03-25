import { GoogleGenAI, Chat } from "@google/genai";
import type { AirQualityData } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("Gemini API key is not set. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const getSystemInstruction = (data: AirQualityData) => {
    return `You are Aura, a friendly and helpful AI assistant specializing in air quality. Your goal is to provide clear, concise, and actionable advice.
    You must use the following real-time data for ${data.location} to answer user questions:
    - Current AQI: ${data.aqi} (${data.level})
    - Recommendation: ${data.recommendations.general}
    - Pollutants: ${data.pollutants.map(p => `${p.name} (${p.symbol}): ${p.value} ${p.unit}`).join(', ')}
    
    Keep your answers brief and easy to understand. Do not mention you are an AI model. Base your advice on the data provided.
    If the user asks a general question about air quality, answer it, but try to relate it back to their current conditions if possible.`;
};


let chat: Chat | null = null;

export const startChat = (airQualityData: AirQualityData) => {
    chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: getSystemInstruction(airQualityData),
        },
    });
};

export const sendMessageToGemini = async (message: string, airQualityData: AirQualityData): Promise<AsyncGenerator<string>> => {
    if (!API_KEY) {
        async function* apiKeyErrorGenerator() {
            yield "Gemini API key not configured. Please contact the administrator.";
        }
        return apiKeyErrorGenerator();
    }
    
    if (!chat) {
        startChat(airQualityData);
    }

    const result = await chat!.sendMessageStream({ message });
    
    async function* streamGenerator() {
        for await (const chunk of result) {
            yield chunk.text;
        }
    }
    
    return streamGenerator();
};