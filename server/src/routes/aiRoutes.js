import { Router } from 'express';
import { chatWithAgent, getSuggestedPrompts } from '../controllers/aiController.js';
import rateLimiter from '../middlewares/rateLimiter.js';

const router = Router();

// Apply 30 requests/minute rate limit to AI chat interactions
const chatRateLimiter = rateLimiter({
  windowMs: 60 * 1000,
  max: 30,
  message: 'AI assistant rate limit reached. Please wait a moment before sending another prompt.',
});

/**
 * POST /api/ai/chat
 * Multi-turn Gemini shopping assistant with autonomous tool calling
 */
router.post('/chat', chatRateLimiter, chatWithAgent);

/**
 * GET /api/ai/prompts
 * Returns recommended starter prompts
 */
router.get('/prompts', getSuggestedPrompts);

export default router;
