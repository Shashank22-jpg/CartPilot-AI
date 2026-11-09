import { handleAgentChat } from '../services/aiAgent.js';
import { isGeminiConfigured } from '../config/gemini.js';

/**
 * CartPilot AI - AI Agent Controller
 */

export async function chatWithAgent(req, res, next) {
  try {
    const { message, history, context } = req.body;

    // Input Validation
    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error: "message" field is required and must be a non-empty string.',
      });
    }

    if (message.length > 1000) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error: Message exceeds maximum allowed length of 1000 characters.',
      });
    }

    if (history !== undefined && !Array.isArray(history)) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error: "history" must be an array of prior messages.',
      });
    }

    if (!isGeminiConfigured()) {
      return res.status(503).json({
        success: false,
        error: 'Gemini AI service is not configured. Please supply GEMINI_API_KEY in server/.env.',
      });
    }

    const agentResult = await handleAgentChat({
      message: message.trim(),
      history: history || [],
      context: context || {},
    });

    return res.status(200).json({
      success: true,
      data: agentResult,
    });
  } catch (error) {
    console.error('[AI Controller] Chat error:', error);
    return res.status(500).json({
      success: false,
      error: 'An error occurred while communicating with the AI shopping agent: ' + (error.message || 'Internal server error'),
    });
  }
}

/**
 * GET /api/ai/prompts
 * Returns curated prompt suggestions for product discovery and comparison
 */
export async function getSuggestedPrompts(req, res) {
  const prompts = [
    {
      title: 'Compare Headphones',
      prompt: 'Compare the Sony WH-1000XM5 and Bose QuietComfort Ultra for frequent flights.',
      category: 'Audio',
    },
    {
      title: 'Dev Laptop under ₹2 Lakh',
      prompt: 'Find the best laptop with high RAM for software development under ₹2,00,000.',
      category: 'Laptops',
    },
    {
      title: 'Gaming Console',
      prompt: 'Recommend a handheld gaming console under ₹65,000 with high refresh rate.',
      category: 'Gaming',
    },
    {
      title: 'Custom Keyboard',
      prompt: 'What mechanical keyboards with aluminum chassis do you have in stock?',
      category: 'Keyboards',
    },
  ];

  res.status(200).json({
    success: true,
    data: prompts,
  });
}

export default {
  chatWithAgent,
  getSuggestedPrompts,
};
