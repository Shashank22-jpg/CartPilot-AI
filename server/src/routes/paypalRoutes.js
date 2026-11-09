import { Router } from 'express';
import {
  getPayPalPublicConfig,
  createPayPalOrder,
  capturePayPalOrder,
} from '../services/paypalService.js';
import { getDbOrderById } from '../services/db.js';

const router = Router();

/**
 * GET /api/payments/config or /api/paypal/config
 * Exposes safe public PayPal configuration for the frontend checkout buttons
 */
router.get('/config', (req, res) => {
  try {
    const config = getPayPalPublicConfig();
    return res.status(200).json({
      success: true,
      ...config,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

/**
 * POST /api/payments/create-order or /api/paypal/create-order
 * Recalculates authoritative prices on server, verifies stock, and creates PayPal sandbox order
 */
router.post('/create-order', async (req, res, next) => {
  try {
    const { items, currency, shippingAddress, notes } = req.body;
    const userId = req.user?.id || req.headers['x-user-id'] || req.body.userId;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Order must contain at least one item.',
      });
    }

    const orderResult = await createPayPalOrder({
      items,
      currency: currency || 'USD',
      shippingAddress,
      notes,
      userId,
    });

    return res.status(201).json({
      success: true,
      ...orderResult,
    });
  } catch (err) {
    console.error('[PayPal API] create-order error:', err.message);
    const status = err.statusCode || 400;
    return res.status(status).json({
      success: false,
      error: err.message || 'Failed to create PayPal Sandbox order.',
      code: err.code || 'PAYMENT_SAFETY_REJECTED',
    });
  }
});

/**
 * POST /api/payments/capture-order or /api/paypal/capture-order
 * Captures PayPal order, verifies settlement, decrements stock, updates database & mints Digital Purchase Passports
 */
router.post('/capture-order', async (req, res, next) => {
  try {
    const { orderID, paypalOrderId, orderId } = req.body;
    const effectivePayPalOrderId = orderID || paypalOrderId;
    const userId = req.user?.id || req.headers['x-user-id'] || req.body.userId;

    if (!effectivePayPalOrderId) {
      return res.status(400).json({
        success: false,
        error: 'orderID or paypalOrderId is required to capture payment.',
      });
    }

    const captureResult = await capturePayPalOrder({
      paypalOrderId: effectivePayPalOrderId,
      orderId,
      userId,
    });

    return res.status(200).json({
      success: true,
      ...captureResult,
    });
  } catch (err) {
    console.error('[PayPal API] capture-order error:', err.message);
    const status = err.statusCode || 400;
    return res.status(status).json({
      success: false,
      error: err.message || 'Payment capture failed or could not be verified.',
      code: err.code || 'PAYMENT_CAPTURE_REJECTED',
    });
  }
});

/**
 * GET /api/payments/order/:orderId
 * Fetch full order verification and digital passport details
 */
router.get('/order/:orderId', async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const order = await getDbOrderById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        error: `Order not found with ID ${orderId}`,
      });
    }

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
