import { Router } from 'express';

const router = Router();

// Placeholder for order history & digital purchase passports
router.get('/', (req, res) => {
  res.status(501).json({
    message: 'Orders and Digital Purchase Passport endpoint scaffolded.',
  });
});

export default router;
