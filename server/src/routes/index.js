import { Router } from 'express';
import healthRoutes from './healthRoutes.js';
import aiRoutes from './aiRoutes.js';
import productRoutes from './productRoutes.js';
import paypalRoutes from './paypalRoutes.js';
import orderRoutes from './orderRoutes.js';
import authRoutes from './authRoutes.js';
import cartRoutes from './cartRoutes.js';

const apiRouter = Router();

// Register sub-routers
apiRouter.use('/', healthRoutes);
apiRouter.use('/health', healthRoutes);
apiRouter.use('/auth', authRoutes);
apiRouter.use('/ai', aiRoutes);
apiRouter.use('/assistant', aiRoutes); // Direct alias for assistant endpoints
apiRouter.use('/products', productRoutes);
apiRouter.use('/paypal', paypalRoutes);
apiRouter.use('/payments', paypalRoutes);
apiRouter.use('/orders', orderRoutes);
apiRouter.use('/cart', cartRoutes);

export default apiRouter;
