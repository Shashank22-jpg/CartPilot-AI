import { Router } from 'express';

const router = Router();

// Placeholder route for product catalogue
router.get('/', (req, res) => {
  res.status(501).json({
    message: 'Products catalogue endpoint scaffolded. Ready for seed inventory and search filters.',
  });
});

export default router;
