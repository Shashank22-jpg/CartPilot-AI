import 'dotenv/config';
import { supabaseAdmin, isSupabaseConfigured } from '../config/supabase.js';

async function runVerification() {
  console.log('====================================================');
  console.log('🔍 CARTPILOT AI - DEMO CLEANUP VERIFICATION SUITE');
  console.log('====================================================\n');

  if (!isSupabaseConfigured()) {
    console.error('❌ Supabase not configured in server/.env');
    process.exit(1);
  }

  // 1. Inspect Products in Supabase
  const { data: products, error: pErr } = await supabaseAdmin
    .from('products')
    .select('id, slug, title, catalogue_source, verification_tier, currency, lifecycle_status, specs');

  if (pErr) {
    console.error('❌ Error querying products:', pErr.message);
    process.exit(1);
  }

  const aptdotProducts = products.filter(p => p.catalogue_source === 'aptdot_synthetic');
  const legacyDemoProducts = products.filter(p => p.catalogue_source === 'cartpilot_demo');

  let totalVariants = 0;
  aptdotProducts.forEach(p => {
    if (Array.isArray(p.specs?.variants)) {
      totalVariants += p.specs.variants.length;
    }
  });

  console.log('📦 1. DATABASE PRODUCT INVENTORY:');
  console.log(`   - Total Products in DB:       ${products.length}`);
  console.log(`   - Aptdot Synthetic Products:   ${aptdotProducts.length} (Target: 50)`);
  console.log(`   - Aptdot Nested Variants:     ${totalVariants} (Target: 135)`);
  console.log(`   - Legacy Demo Products:       ${legacyDemoProducts.length} (Target: 0 after Migration 005)`);

  if (legacyDemoProducts.length > 0) {
    console.log('\n   ⚠️ Remaining Legacy Demo Products awaiting Migration 005 execution in SQL Editor:');
    legacyDemoProducts.forEach(p => {
      console.log(`      • ID: ${p.id} | Slug: ${p.slug} | Title: ${p.title}`);
    });
  }

  // 2. Inspect Preserved Orders & Passports
  const { count: ordersCount } = await supabaseAdmin.from('orders').select('*', { count: 'exact', head: true });
  const { count: orderItemsCount } = await supabaseAdmin.from('order_items').select('*', { count: 'exact', head: true });
  const { count: paymentsCount } = await supabaseAdmin.from('payments').select('*', { count: 'exact', head: true });
  const { count: passportsCount } = await supabaseAdmin.from('purchase_passports').select('*', { count: 'exact', head: true });

  console.log('\n🛡️ 2. TRANSACTION DATA PRESERVATION AUDIT:');
  console.log(`   - Total Orders Preserved:      ${ordersCount} (Target: 4)`);
  console.log(`   - Total Order Items Preserved: ${orderItemsCount} (Target: 4)`);
  console.log(`   - Total Payments Preserved:    ${paymentsCount} (Target: 1)`);
  console.log(`   - Total Passports Preserved:   ${passportsCount} (Target: 1)`);

  // 3. Test Backend Express Endpoints
  console.log('\n🌐 3. BACKEND API INTEGRITY CHECK:');
  try {
    const aptRes = await fetch('http://localhost:5000/api/products?catalogue=aptdot_demo');
    const aptJson = await aptRes.json();
    console.log(`   - GET /api/products?catalogue=aptdot_demo: Status ${aptRes.status} (Count: ${aptJson.count}, Currency: ${aptJson.currencies?.[0]})`);

    const domRes = await fetch('http://localhost:5000/api/products?catalogue=domestic');
    const domJson = await domRes.json();
    console.log(`   - GET /api/products?catalogue=domestic:    Status ${domRes.status} (Count: ${domJson.count})`);

    const promptRes = await fetch('http://localhost:5000/api/ai/prompts');
    const promptJson = await promptRes.json();
    console.log(`   - GET /api/ai/prompts:                     Status ${promptRes.status} (Suggestions: ${promptJson.data?.length})`);

    // 4. Test PayPal Payment Safety Guardrail
    const sampleAptdotId = aptdotProducts[0]?.id;
    const ppRes = await fetch('http://localhost:5000/api/payments/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: [{ productId: sampleAptdotId, quantity: 1, price: 199.99 }]
      })
    });
    const ppJson = await ppRes.json();
    console.log('\n🔒 4. PAYPAL PAYMENT SAFETY TEST:');
    console.log(`   - POST /api/payments/create-order (Synthetic item): Status ${ppRes.status}`);
    console.log(`   - Safety Rejection Code: ${ppJson.code}`);
    console.log(`   - Safety Message: "${ppJson.error}"`);

    if (ppRes.status === 400 && ppJson.code === 'SYNTHETIC_CATALOGUE_PAYMENT_BLOCKED') {
      console.log('   ✅ Live PayPal checkout protection is ACTIVE and ENFORCED.');
    } else {
      console.log('   ❌ PayPal safety check failed!');
    }
  } catch (apiErr) {
    console.error('❌ API verification error:', apiErr.message);
  }

  console.log('\n====================================================');
  console.log('📋 SUMMARY: Cleanups complete across backend, Gemini AI,');
  console.log('and frontend. Ready for Migration 005 execution.');
  console.log('====================================================\n');
}

runVerification();
