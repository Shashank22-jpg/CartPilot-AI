import { Router } from 'express';
import healthRoutes from './healthRoutes.js';
import aiRoutes from './aiRoutes.js';
import productRoutes from './productRoutes.js';
import paypalRoutes from './paypalRoutes.js';
import orderRoutes from './orderRoutes.js';

const apiRouter = Router();

// Register sub-routers
apiRouter.use('/', healthRoutes);
apiRouter.use('/ai', aiRoutes);
apiRouter.use('/products', productRoutes);
apiRouter.use('/paypal', paypalRoutes);
apiRouter.use('/orders', orderRoutes);

export default apiRouter;
