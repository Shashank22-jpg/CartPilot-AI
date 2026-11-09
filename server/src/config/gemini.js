import { GoogleGenerativeAI } from '@google/generative-ai';
import config from './env.js';

let geminiClient = null;

if (config.gemini.apiKey) {
  try {
    geminiClient = new GoogleGenerativeAI(config.gemini.apiKey);
    console.log('[Gemini] Generative AI client initialized successfully.');
  } catch (error) {
    console.warn('[Gemini] Initialization warning:', error.message);
  }
} else {
  console.log('[Gemini] API Key not provided in environment. Gemini AI integration pending configuration.');
}

export const isGeminiConfigured = () => Boolean(geminiClient);
export const getGeminiClient = () => geminiClient;
export const getGeminiModel = (options = {}) => {
  if (!geminiClient) {
    throw new Error('Gemini API client is not configured. Please supply GEMINI_API_KEY in server/.env.');
  }
  if (typeof options === 'string') {
    return geminiClient.getGenerativeModel({ model: options });
  }
  return geminiClient.getGenerativeModel({
    model: options.model || config.gemini.model,
    systemInstruction: options.systemInstruction,
    tools: options.tools,
    generationConfig: options.generationConfig,
  });
};

export default {
  geminiClient,
  isGeminiConfigured,
  getGeminiClient,
  getGeminiModel,
};
