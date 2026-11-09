import { Router } from 'express';
import { getHealth, getDbHealth } from '../controllers/healthController.js';

const router = Router();

router.get('/health', getHealth);
router.get('/health/db', getDbHealth);
router.get('/db/health', getDbHealth);

export default router;
