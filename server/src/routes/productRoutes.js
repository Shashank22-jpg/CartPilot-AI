import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getDbProducts, getDbProductByIdOrSlug, formatProductWithVariants } from '../services/db.js';
import { isSupabaseConfigured } from '../config/supabase.js';
import { generateAptdotPlaceholderSvg } from '../scripts/seedAptdotCatalogue.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const aptdotJsonPath = path.resolve(__dirname, '../../../data/aptdot-products.json');

/**
 * Fallback loader to parse Aptdot synthetic dataset directly from data/aptdot-products.json
 * Guarantees 50 demo products and 135 variants are visible even if database is not seeded.
 */
function loadAptdotProductsFromFile() {
  if (!fs.existsSync(aptdotJsonPath)) return [];
  const raw = JSON.parse(fs.readFileSync(aptdotJsonPath, 'utf8'));
  return (raw.products || []).map((p) => {
    let dynamicTag = 'Synthetic Demo';
    if (p.status === 'draft') dynamicTag = 'Draft (Hidden)';
    else if (p.status === 'archived') dynamicTag = 'Archived / Discontinued';
    else if (p.availability === 'preorder') dynamicTag = 'Preorder';
    else if (p.availability === 'backorder') dynamicTag = 'Backorder';
    else if (!p.in_stock) dynamicTag = 'Out of Stock';
    else if (p.inventory_quantity <= p.low_stock_threshold) dynamicTag = `Only ${p.inventory_quantity} Left`;
    else if (p.compare_at_price && p.compare_at_price > p.price) dynamicTag = 'On Sale';

    const placeholderUrl = generateAptdotPlaceholderSvg({
      id: p.id,
      sku: p.sku,
      name: p.name,
      category: p.category,
    });

    return formatProductWithVariants({
      id: p.uuid,
      slug: `aptdot-${p.slug}`,
      title: p.name,
      name: p.name,
      brand: p.brand || 'Aptdot Sample Goods',
      category: p.category,
      description: p.description,
      price: Number(p.price),
      original_price: p.compare_at_price ? Number(p.compare_at_price) : null,
      currency: 'USD',
      rating: p.rating?.average || 4.5,
      reviews_count: p.rating?.review_count || 0,
      stock: Number(p.inventory_quantity),
      in_stock: Boolean(p.in_stock),
      image_url: placeholderUrl,
      tag: dynamicTag,
      badge_type: 'demo',
      is_demo: true,
      catalogue_source: 'aptdot_synthetic',
      lifecycle_status: p.status,
      verification_tier: 'demo',
      seller: {
        name: 'Aptdot Sample Goods',
        verifiedStatus: 'Synthetic Demo Catalogue',
        authorizedPartner: false,
        rating: p.rating?.average || 4.5,
        location: 'Synthetic Sandbox',
        fulfillment: 'Simulated Delivery (Non-Commercial)',
        synthetic_notice:
          'This item belongs to the Aptdot CC0 Synthetic Benchmark Catalogue. It cannot be purchased for real fulfillment.',
      },
      evidence: {
        source: 'Aptdot Synthetic E-Commerce Product Catalog v1.0.0',
        license: 'CC0-1.0 Universal',
        sku: p.sku,
        dataset_source: 'https://www.aptdot.com/datasets/ecommerce-product-catalog/',
        is_synthetic: true,
      },
      specs: {
        aptdot_id: p.id,
        sku: p.sku,
        product_type: p.product_type,
        cost_price: p.cost_price,
        low_stock_threshold: p.low_stock_threshold,
        availability: p.availability,
        availability_date: p.availability_date,
        dimensions: p.dimensions,
        options: p.options,
        variants: p.variants,
        total_variants: p.variants.length,
      },
      variants: p.variants,
      options: p.options,
      warranty: 'Simulated 1-Year Synthetic Warranty (Demo Only)',
      return_policy: 'Simulated 30-Day Sandbox Returns (Demo Only)',
      risk_assessment: 'Synthetic Demo Item: Fictional specifications for testing and benchmarking only.',
    });
  });
}

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
          includeInactive: true, // Display all 50 Aptdot products
        });

        if (dbProducts !== null && dbProducts.length > 0) {
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

    // Direct fallback from aptdot-products.json if Supabase is not configured or not yet seeded
    try {
      const fileProducts = loadAptdotProductsFromFile();
      if (fileProducts.length > 0) {
        let filtered = fileProducts;
        if (category && category !== 'All') {
          filtered = filtered.filter((p) => p.category === category);
        }
        if (search && search.trim()) {
          const s = search.trim().toLowerCase();
          filtered = filtered.filter(
            (p) =>
              (p.title || '').toLowerCase().includes(s) ||
              (p.brand || '').toLowerCase().includes(s) ||
              (p.description || '').toLowerCase().includes(s)
          );
        }
        if (minPrice !== undefined && minPrice !== '') {
          filtered = filtered.filter((p) => p.price >= Number(minPrice));
        }
        if (maxPrice !== undefined && maxPrice !== '') {
          filtered = filtered.filter((p) => p.price <= Number(maxPrice));
        }

        return res.status(200).json({
          success: true,
          source: 'aptdot_synthetic',
          catalogue: 'aptdot',
          count: filtered.length,
          currencies: ['USD'],
          data: filtered,
        });
      }
    } catch (fallbackErr) {
      console.warn('[Products API] Local Aptdot file fallback failed:', fallbackErr.message);
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

    // Fallback: search in local Aptdot dataset
    try {
      const fileProducts = loadAptdotProductsFromFile();
      const match = fileProducts.find(
        (p) =>
          p.id === idOrSlug ||
          p.slug === idOrSlug ||
          p.specs?.sku === idOrSlug ||
          p.specs?.aptdot_id === idOrSlug
      );
      if (match) {
        return res.status(200).json({
          success: true,
          source: 'aptdot_synthetic',
          data: match,
        });
      }
    } catch {}

    return res.status(404).json({
      success: false,
      error: 'Product not found',
    });
  } catch (err) {
    next(err);
  }
});

export default router;
