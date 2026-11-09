import { Router } from 'express';
import {
  createDbOrder,
  getDbUserOrders,
  getDbUserPassports,
  mintDbPurchasePassport,
} from '../services/db.js';
import { isSupabaseConfigured } from '../config/supabase.js';
import { optionalAuth } from '../middlewares/authMiddleware.js';

const router = Router();

/**
 * GET /api/orders
 * Retrieve order history for current authenticated user
 */
router.get('/', optionalAuth, async (req, res, next) => {
  try {
    const userId = req.user?.id || req.headers['x-user-id'];

    if (!userId) {
      return res.status(200).json({
        success: true,
        source: 'unauthenticated',
        data: [],
      });
    }

    if (isSupabaseConfigured()) {
      try {
        const orders = await getDbUserOrders(userId);
        return res.status(200).json({
          success: true,
          source: 'supabase',
          data: orders || [],
        });
      } catch (dbErr) {
        console.warn('[Orders API] Supabase query failed:', dbErr.message);
      }
    }

    return res.status(200).json({
      success: true,
      source: 'supabase',
      data: [],
    });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/orders
 * Create an order record
 */
router.post('/', optionalAuth, async (req, res, next) => {
  try {
    const { orderNumber, subtotal, tax, shippingCost, total, currency, items, shippingAddress } = req.body;
    const userId = req.user?.id || req.headers['x-user-id'];

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required to place and persist orders.',
      });
    }

    if (!isSupabaseConfigured()) {
      const simOrder = {
        id: `sim-order-${Date.now()}`,
        order_number: orderNumber || `CP-ORD-${Date.now()}`,
        status: 'pending',
        subtotal: Number(subtotal || 0),
        tax: Number(tax || 0),
        shipping_cost: Number(shippingCost || 0),
        total: Number(total || 0),
        currency: currency || 'INR',
        shipping_address: shippingAddress || {},
        created_at: new Date().toISOString(),
      };
      return res.status(201).json({
        success: true,
        source: 'simulated',
        data: simOrder,
      });
    }

    const orderData = {
      orderNumber: orderNumber || `CP-ORD-${Date.now()}`,
      userId,
      subtotal: Number(subtotal),
      tax: Number(tax || 0),
      shippingCost: Number(shippingCost || 0),
      total: Number(total),
      currency: currency || 'INR',
      shippingAddress: shippingAddress || {},
      items: items || [],
    };

    const newOrder = await createDbOrder(orderData);
    return res.status(201).json({
      success: true,
      source: 'supabase',
      data: newOrder,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/orders/passports
 * Retrieve digital purchase passports for current authenticated user
 */
router.get('/passports', optionalAuth, async (req, res, next) => {
  try {
    const userId = req.user?.id || req.headers['x-user-id'];

    if (!userId) {
      return res.status(200).json({
        success: true,
        source: 'unauthenticated',
        data: [],
      });
    }

    if (isSupabaseConfigured()) {
      try {
        const passports = await getDbUserPassports(userId);
        return res.status(200).json({
          success: true,
          source: 'supabase',
          data: passports || [],
        });
      } catch (dbErr) {
        console.warn('[Passports API] Supabase query failed:', dbErr.message);
      }
    }

    return res.status(200).json({
      success: true,
      source: 'supabase',
      data: [],
    });
  } catch (err) {
    next(err);
  }
});

export default router;
