import { Router } from 'express';
import { getDbProducts, getDbProductByIdOrSlug, formatProductWithVariants } from '../services/db.js';
import { isSupabaseConfigured } from '../config/supabase.js';

const router = Router();

/**
 * Core handler for retrieving product catalogue
 */
async function handleGetProducts(req, res, next) {
  try {
    const {
      category,
      search,
      minPrice,
      maxPrice,
      currency = 'USD',
      inStock,
      limit = 100,
      offset = 0,
      sortBy,
      sortOrder,
    } = req.query;

    const cleanCatalogue = 'aptdot_synthetic';

    // Input validation for price filters
    if (minPrice !== undefined && minPrice !== '') {
      const numMin = Number(minPrice);
      if (isNaN(numMin) || numMin < 0) {
        return res.status(400).json({
          success: false,
          error: 'Invalid minPrice: must be a non-negative number',
        });
      }
    }

    if (maxPrice !== undefined && maxPrice !== '') {
      const numMax = Number(maxPrice);
      if (isNaN(numMax) || numMax < 0) {
        return res.status(400).json({
          success: false,
          error: 'Invalid maxPrice: must be a non-negative number',
        });
      }
    }

    if (minPrice && maxPrice && Number(minPrice) > Number(maxPrice)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid price range: minPrice cannot be greater than maxPrice',
      });
    }

    if (limit !== undefined && limit !== '') {
      const numLimit = parseInt(limit, 10);
      if (isNaN(numLimit) || numLimit < 1 || numLimit > 100) {
        return res.status(400).json({
          success: false,
          error: 'Invalid limit: must be an integer between 1 and 100',
        });
      }
    }

    if (offset !== undefined && offset !== '') {
      const numOffset = parseInt(offset, 10);
      if (isNaN(numOffset) || numOffset < 0) {
        return res.status(400).json({
          success: false,
          error: 'Invalid offset: must be a non-negative integer',
        });
      }
    }

    if (isSupabaseConfigured()) {
      try {
        const dbProducts = await getDbProducts({
          catalogue: cleanCatalogue,
          category,
          search,
          minPrice,
          maxPrice,
          currency,
          inStock,
          limit,
          offset,
          sortBy,
          sortOrder,
          includeInactive: false, // strictly exclude draft and archived products
        });

        if (dbProducts !== null) {
          const uniqueCurrencies = [...new Set(dbProducts.map((p) => p.currency))];
          return res.status(200).json({
            success: true,
            source: 'supabase',
            catalogue: 'aptdot',
            count: dbProducts.length,
            currencies: uniqueCurrencies,
            data: dbProducts,
          });
        }
      } catch (dbErr) {
        console.warn('[Products API] Supabase query failed:', dbErr.message);
      }
    }

    return res.status(200).json({
      success: true,
      source: 'database',
      catalogue: cleanCatalogue,
      count: 0,
      currencies: [],
      data: [],
      notice: 'No products available for this catalogue query.',
    });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/products
 * Retrieve structured product catalogue with multi-catalogue filtering, search & pagination.
 */
router.get('/', handleGetProducts);

/**
 * GET /api/products/aptdot
 * Convenience endpoint returning exclusively the Aptdot synthetic demo catalogue
 */
router.get('/aptdot', (req, res, next) => {
  req.query.catalogue = 'aptdot_demo';
  return handleGetProducts(req, res, next);
});

/**
 * GET /api/products/:idOrSlug
 * Retrieve single product by UUID or slug with full variant matrix.
 * Draft products are strictly hidden from the public API (returns 404).
 */
router.get('/:idOrSlug', async (req, res, next) => {
  try {
    const { idOrSlug } = req.params;

    if (isSupabaseConfigured()) {
      try {
        const dbProduct = await getDbProductByIdOrSlug(idOrSlug);
        if (dbProduct) {
          // Do not expose draft products through public API
          if (dbProduct.lifecycle_status === 'draft') {
            return res.status(404).json({
              success: false,
              error: 'Product not found',
            });
          }

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

    return res.status(404).json({
      success: false,
      error: 'Product not found',
    });
  } catch (err) {
    next(err);
  }
});

export default router;
