import { Router } from 'express';

const router = Router();

// Placeholder route for Gemini agent conversation & tool execution
router.post('/chat', (req, res) => {
  res.status(501).json({
    message: 'AI agent chat endpoint scaffolded. Ready for Gemini tool calling integration.',
  });
});

export default router;
