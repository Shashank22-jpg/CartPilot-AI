import { Router } from 'express';
import {
  createDbOrder,
  getDbUserOrders,
  getDbUserPassports,
  mintDbPurchasePassport,
} from '../services/db.js';
import { isSupabaseConfigured } from '../config/supabase.js';

const router = Router();

// Demo test user UUID for hackathon sandbox prototyping if unauthenticated
const DEMO_USER_ID = '00000000-0000-0000-0000-000000000001';

/**
 * GET /api/orders
 * Retrieve order history for current user
 */
router.get('/', async (req, res, next) => {
  try {
    const userId = req.user?.id || req.headers['x-user-id'] || DEMO_USER_ID;

    if (isSupabaseConfigured()) {
      try {
        const orders = await getDbUserOrders(userId);
        return res.status(200).json({
          success: true,
          source: 'supabase',
          data: orders,
        });
      } catch (dbErr) {
        console.warn('[Orders API] Supabase query failed:', dbErr.message);
      }
    }

    return res.status(200).json({
      success: true,
      source: 'simulated',
      data: [],
      notice: 'Supabase pending configuration. Connect credentials to persist orders.',
    });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/orders
 * Create an order record
 */
router.post('/', async (req, res, next) => {
  try {
    const userId = req.user?.id || req.headers['x-user-id'] || DEMO_USER_ID;
    const { items, subtotal, tax, shippingCost, total, currency, shippingAddress, notes } = req.body;

    if (!items || !items.length || !total) {
      return res.status(400).json({
        success: false,
        error: 'Order payload must include valid items and total amount',
      });
    }

    if (isSupabaseConfigured()) {
      try {
        const order = await createDbOrder({
          userId,
          items,
          subtotal,
          tax,
          shippingCost,
          total,
          currency: currency || 'INR',
          shippingAddress,
          notes,
        });

        return res.status(201).json({
          success: true,
          source: 'supabase',
          data: order,
        });
      } catch (dbErr) {
        console.warn('[Orders API] Supabase createOrder failed:', dbErr.message);
      }
    }

    // Mock response when DB is unconfigured
    const mockOrderNumber = `CP-ORD-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    return res.status(201).json({
      success: true,
      source: 'simulated',
      data: {
        id: `mock-${Date.now()}`,
        order_number: mockOrderNumber,
        status: 'pending',
        total,
        currency: currency || 'INR',
        created_at: new Date().toISOString(),
      },
    });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/orders/passports
 * Retrieve digital purchase passports for user
 */
router.get('/passports', async (req, res, next) => {
  try {
    const userId = req.user?.id || req.headers['x-user-id'] || DEMO_USER_ID;

    if (isSupabaseConfigured()) {
      try {
        const passports = await getDbUserPassports(userId);
        return res.status(200).json({
          success: true,
          source: 'supabase',
          data: passports,
        });
      } catch (dbErr) {
        console.warn('[Passports API] Supabase query failed:', dbErr.message);
      }
    }

    return res.status(200).json({
      success: true,
      source: 'simulated',
      data: [],
      notice: 'Supabase pending configuration. Connect credentials to fetch live passports.',
    });
  } catch (err) {
    next(err);
  }
});

export default router;
