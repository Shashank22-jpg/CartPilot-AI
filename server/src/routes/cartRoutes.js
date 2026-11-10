import { Router } from 'express';
import { getDbProducts } from '../services/db.js';

const router = Router();

/**
 * GET /api/cart
 * Returns cart guardrails, currency rules, and validation policy
 */
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    currency: 'USD',
    policy: {
      maxItemsPerOrder: 50,
      stockEnforcement: 'authoritative_database',
      sandboxSimulated: true,
      allowedCurrencies: ['USD'],
    },
    timestamp: new Date().toISOString(),
  });
});

/**
 * POST /api/cart/validate
 * Validates a list of cart items against real database products and variant stock
 */
router.post('/validate', async (req, res, next) => {
  try {
    const { items = [] } = req.body;
    if (!Array.isArray(items)) {
      return res.status(400).json({
        success: false,
        error: 'Items must be an array.',
      });
    }

    const products = await getDbProducts();
    const productList = Array.isArray(products) ? products : [];
    const productMap = new Map(productList.map((p) => [String(p.id), p]));

    const validatedItems = [];
    let subtotal = 0;
    let allAvailable = true;

    for (const item of items) {
      const productId = String(item.id || item.productId);
      const dbProduct = productMap.get(productId);

      if (!dbProduct) {
        validatedItems.push({
          id: productId,
          valid: false,
          error: 'Product not found in active catalogue.',
        });
        allAvailable = false;
        continue;
      }

      const price = Number(dbProduct.price || 0);
      const qty = Math.max(1, Number(item.quantity || 1));
      const inStock = Boolean(dbProduct.stock > 0);

      if (!inStock) {
        allAvailable = false;
      }

      subtotal += price * qty;

      validatedItems.push({
        id: dbProduct.id,
        title: dbProduct.title,
        price,
        quantity: qty,
        lineTotal: Math.round(price * qty * 100) / 100,
        inStock,
        valid: inStock,
      });
    }

    return res.status(200).json({
      success: true,
      valid: allAvailable,
      itemCount: validatedItems.length,
      subtotal: Math.round(subtotal * 100) / 100,
      currency: 'USD',
      items: validatedItems,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    next(err);
  }
});

export default router;
