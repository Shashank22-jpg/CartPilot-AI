import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { supabaseAdmin, isSupabaseConfigured } from '../config/supabase.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Generate a deterministic, theme-aligned SVG placeholder data URI for synthetic demo items.
 * Guarantees zero copyright issues, zero third-party dependencies, and clear synthetic labeling.
 */
function generateAptdotPlaceholderSvg({ id, sku, name, category }) {
  const categoryThemes = {
    'Electronics & Accessories': { stroke: '#3B82F6', badgeBg: '#1E3A8A', text: '#93C5FD' },
    'Apparel & Wearables': { stroke: '#8B5CF6', badgeBg: '#4C1D95', text: '#C4B5FD' },
    'Home & Kitchen': { stroke: '#F59E0B', badgeBg: '#78350F', text: '#FDE68A' },
    'Health & Fitness': { stroke: '#10B981', badgeBg: '#064E3B', text: '#A7F3D0' },
    'Office & Workspace': { stroke: '#6366F1', badgeBg: '#312E81', text: '#C7D2FE' },
  };

  const theme = categoryThemes[category] || { stroke: '#64748B', badgeBg: '#1E293B', text: '#CBD5E1' };

  const escapeXml = (str) =>
    String(str).replace(/[&<>"']/g, (m) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&apos;',
    }[m]));

  const safeSku = escapeXml(sku || id);
  const safeCategory = escapeXml(category || 'Demo');
  const safeName = escapeXml(name.length > 34 ? `${name.substring(0, 32)}...` : name);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="600" height="450">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0B0F19"/>
      <stop offset="100%" stop-color="#111827"/>
    </linearGradient>
    <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${theme.stroke}" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#6366F1" stop-opacity="0.9"/>
    </linearGradient>
  </defs>
  <rect width="600" height="450" fill="url(#bgGrad)"/>
  <rect x="20" y="20" width="560" height="410" rx="16" fill="none" stroke="url(#accentGrad)" stroke-width="2" stroke-dasharray="6,6" opacity="0.6"/>
  
  <!-- Header Badge -->
  <rect x="175" y="50" width="250" height="34" rx="17" fill="${theme.badgeBg}" stroke="${theme.stroke}" stroke-width="1.5"/>
  <text x="300" y="72" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="${theme.text}" text-anchor="middle" letter-spacing="1.5">APTDOT SYNTHETIC DEMO</text>
  
  <!-- Center Wireframe / Graphic Box -->
  <rect x="235" y="125" width="130" height="110" rx="14" fill="#1F2937" stroke="${theme.stroke}" stroke-width="2"/>
  <path d="M275 180 L300 155 L325 180 L300 205 Z" fill="none" stroke="${theme.stroke}" stroke-width="3" stroke-linejoin="round"/>
  <circle cx="300" cy="180" r="7" fill="${theme.stroke}"/>

  <!-- Product Details -->
  <text x="300" y="280" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="600" fill="#F9FAFB" text-anchor="middle">${safeName}</text>
  <text x="300" y="310" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="500" fill="#9CA3AF" text-anchor="middle">${safeCategory} • SKU: ${safeSku}</text>

  <!-- Footer Disclaimer Badge -->
  <rect x="140" y="360" width="320" height="30" rx="8" fill="#111827" stroke="#374151" stroke-width="1"/>
  <text x="300" y="380" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="500" fill="#6B7280" text-anchor="middle">Synthetic Specification • CC0 1.0 Universal</text>
</svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/**
 * Seed Aptdot synthetic e-commerce product catalogue into Supabase public.products table.
 * Idempotent, non-destructive, strictly preserves existing data and PayPal safety.
 */
export async function seedAptdotCatalogue({ dryRun = false } = {}) {
  const jsonPath = path.resolve(__dirname, '../../../data/aptdot-products.json');

  if (!fs.existsSync(jsonPath)) {
    throw new Error(`Aptdot catalogue file not found at: ${jsonPath}`);
  }

  const rawJson = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  const products = rawJson.products || [];

  if (products.length !== 50) {
    throw new Error(`Expected exactly 50 products in Aptdot dataset, found ${products.length}`);
  }

  console.log(`[Aptdot Seeder] Loaded ${products.length} products from ${jsonPath}`);
  console.log(`[Aptdot Seeder] Mode: ${dryRun ? 'DRY-RUN (Validation Only)' : 'LIVE SEEDING'}`);

  let totalVariants = 0;
  const transformed = [];

  for (const p of products) {
    totalVariants += (p.variants || []).length;

    // Derive tag based on inventory & lifecycle edge cases
    let dynamicTag = 'Synthetic Demo';
    if (p.status === 'draft') dynamicTag = 'Draft (Hidden)';
    else if (p.status === 'archived') dynamicTag = 'Archived / Discontinued';
    else if (p.availability === 'preorder') dynamicTag = 'Preorder (Nov 20)';
    else if (p.availability === 'backorder') dynamicTag = 'Backorder';
    else if (!p.in_stock) dynamicTag = 'Out of Stock';
    else if (p.inventory_quantity <= p.low_stock_threshold) dynamicTag = `Only ${p.inventory_quantity} Left`;
    else if (p.compare_at_price && p.compare_at_price > p.price) dynamicTag = 'On Sale';

    // Labelled placeholder SVG
    const placeholderUrl = generateAptdotPlaceholderSvg({
      id: p.id,
      sku: p.sku,
      name: p.name,
      category: p.category,
    });

    const record = {
      id: p.uuid, // RFC 9562 UUIDv7
      slug: `aptdot-${p.slug}`, // Namespaced slug prevents collision with existing products
      title: p.name,
      name: p.name,
      brand: p.brand || 'Aptdot Sample Goods',
      category: p.category,
      description: p.description,
      price: Number(p.price), // USD pricing preserved
      original_price: p.compare_at_price ? Number(p.compare_at_price) : null,
      currency: 'USD',
      rating: p.rating?.average !== null && p.rating?.average !== undefined ? Number(p.rating.average) : 0,
      reviews_count: p.rating?.review_count || 0,
      stock: Number(p.inventory_quantity),
      in_stock: Boolean(p.in_stock),
      image_url: placeholderUrl,
      tag: dynamicTag,
      badge_type: 'demo',
      is_demo: true,
      catalogue_source: 'aptdot_synthetic', // Explicit catalogue source
      lifecycle_status: p.status, // 'active', 'draft', 'archived'
      verification_tier: 'demo', // Explicit demo tier
      price_updated_at: null, // Strictly NULL: Aptdot updated_at does not represent verified retail price update
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
      warranty: 'Simulated 1-Year Synthetic Warranty (Demo Only)',
      return_policy: 'Simulated 30-Day Sandbox Returns (Demo Only)',
      risk_assessment: 'Synthetic Demo Item: Fictional specifications for testing and benchmarking only.',
    };

    transformed.push(record);
  }

  console.log(`[Aptdot Seeder] Successfully mapped 50 products and ${totalVariants} variants.`);

  if (dryRun) {
    return {
      success: true,
      dryRun: true,
      totalProducts: transformed.length,
      totalVariants,
      sampleRecord: {
        id: transformed[0].id,
        slug: transformed[0].slug,
        title: transformed[0].title,
        price: transformed[0].price,
        currency: transformed[0].currency,
        catalogue_source: transformed[0].catalogue_source,
        lifecycle_status: transformed[0].lifecycle_status,
        verification_tier: transformed[0].verification_tier,
        price_updated_at: transformed[0].price_updated_at,
      },
    };
  }

  // Live database upsert
  if (!isSupabaseConfigured() || !supabaseAdmin) {
    throw new Error('Supabase admin client is not configured. Check server .env settings.');
  }

  // Upsert in batches of 25 to respect payload boundaries
  const BATCH_SIZE = 25;
  for (let i = 0; i < transformed.length; i += BATCH_SIZE) {
    const chunk = transformed.slice(i, i + BATCH_SIZE);
    const { error } = await supabaseAdmin.from('products').upsert(chunk, {
      onConflict: 'id',
    });

    if (error) {
      console.error(`[Aptdot Seeder] Batch ${i / BATCH_SIZE + 1} upsert failed:`, error.message);
      throw error;
    }
    console.log(`[Aptdot Seeder] Batch ${i / BATCH_SIZE + 1} (${chunk.length} items) upserted successfully.`);
  }

  console.log('[Aptdot Seeder] All 50 Aptdot products seeded successfully with idempotent upsert.');
  return {
    success: true,
    totalProducts: transformed.length,
    totalVariants,
  };
}

// Direct execution CLI entrypoint with safety check
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const isDryRun = process.argv.includes('--dry-run');
  seedAptdotCatalogue({ dryRun: isDryRun })
    .then((result) => {
      console.log('[Aptdot Seeder CLI] Completed:', JSON.stringify(result, null, 2));
      process.exit(0);
    })
    .catch((err) => {
      console.error('[Aptdot Seeder CLI] Execution failed:', err.message);
      process.exit(1);
    });
}
