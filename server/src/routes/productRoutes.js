import { Router } from 'express';
import { getDbProducts, getDbProductByIdOrSlug } from '../services/db.js';
import { seedProducts } from '../data/seedProducts.js';
import { isSupabaseConfigured } from '../config/supabase.js';

const router = Router();

/**
 * GET /api/products
 * Retrieve structured product catalogue with filtering & search
 */
router.get('/', async (req, res, next) => {
  try {
    const { category, search, minPrice, maxPrice } = req.query;

    if (isSupabaseConfigured()) {
      try {
        const dbProducts = await getDbProducts(req.query);
        if (dbProducts && dbProducts.length > 0) {
          return res.status(200).json({
            success: true,
            source: 'supabase',
            count: dbProducts.length,
            data: dbProducts,
          });
        }
      } catch (dbErr) {
        console.warn('[Products API] Supabase query failed, using seed fallback:', dbErr.message);
      }
    }

    // High-fidelity fallback to server seed catalogue
    let filtered = [...seedProducts];

    if (category && category !== 'All') {
      filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    if (minPrice) {
      filtered = filtered.filter(p => p.price >= Number(minPrice));
    }

    if (maxPrice) {
      filtered = filtered.filter(p => p.price <= Number(maxPrice));
    }

    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    return res.status(200).json({
      success: true,
      source: 'seed_fallback',
      count: filtered.length,
      data: filtered,
      notice: 'Serving demonstration seed inventory. Connect Supabase credentials in server/.env to enable live persistence.',
    });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/products/:idOrSlug
 * Retrieve single product by UUID or slug
 */
router.get('/:idOrSlug', async (req, res, next) => {
  try {
    const { idOrSlug } = req.params;

    if (isSupabaseConfigured()) {
      try {
        const dbProduct = await getDbProductByIdOrSlug(idOrSlug);
        if (dbProduct) {
          return res.status(200).json({
            success: true,
            source: 'supabase',
            data: dbProduct,
          });
        }
      } catch (dbErr) {
        console.warn('[Products API] Supabase single query failed:', dbErr.message);
      }
    }

    const item = seedProducts.find(p => p.id === idOrSlug || p.slug === idOrSlug);
    if (!item) {
      return res.status(404).json({
        success: false,
        error: 'Product not found',
      });
    }

    return res.status(200).json({
      success: true,
      source: 'seed_fallback',
      data: item,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
