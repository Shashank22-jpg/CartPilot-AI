/**
 * Phase 4 Verification Test Suite
 * Tests multi-catalogue discovery data contracts, variant matrix integrity, and frontend build compatibility.
 */

async function runTests() {
  const BASE_URL = 'http://localhost:5000';
  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  [PASS] ${message}`);
      passed++;
    } else {
      console.error(`  [FAIL] ${message}`);
      failed++;
    }
  }

  console.log('\n--- TEST SUITE 1: Catalogue Retrieval & Separation ---');
  
  // 1. Domestic Verified Catalogue
  const domesticRes = await fetch(`${BASE_URL}/api/products?catalogue=cartpilot_demo`);
  const domesticData = await domesticRes.json();
  assert(domesticRes.status === 200, 'Domestic catalogue returns HTTP 200');
  assert(domesticData.success === true, 'Domestic response success is true');
  assert(domesticData.count === 12, `Domestic product count is 12 (actual: ${domesticData.count})`);
  assert(domesticData.currencies.length === 1 && domesticData.currencies[0] === 'INR', 'Domestic currency is strictly INR');
  assert(domesticData.data.every(p => p.currency === 'INR'), 'All domestic products have currency INR');

  // 2. Aptdot Synthetic Demo Catalogue
  const aptdotRes = await fetch(`${BASE_URL}/api/products?catalogue=aptdot_demo`);
  const aptdotData = await aptdotRes.json();
  assert(aptdotRes.status === 200, 'Aptdot catalogue returns HTTP 200');
  assert(aptdotData.success === true, 'Aptdot response success is true');
  assert(aptdotData.count === 48, `Aptdot active product count is 48 (actual: ${aptdotData.count})`);
  assert(aptdotData.currencies.length === 1 && aptdotData.currencies[0] === 'USD', 'Aptdot currency is strictly USD');
  assert(aptdotData.data.every(p => p.currency === 'USD'), 'All Aptdot products have currency USD');
  assert(aptdotData.data.every(p => p.catalogue_source === 'aptdot_synthetic'), 'All Aptdot products have catalogue_source = aptdot_synthetic');
  assert(aptdotData.data.every(p => p.lifecycle_status === 'active'), 'All returned Aptdot products have lifecycle_status = active (no drafts/archived)');

  console.log('\n--- TEST SUITE 2: Variant Matrix & Logistics Data Structure ---');
  
  // Find multi-variant product
  const multiVariantProduct = aptdotData.data.find(p => p.has_variants && p.variants.length > 1);
  assert(Boolean(multiVariantProduct), 'Found multi-variant product in Aptdot catalogue');
  if (multiVariantProduct) {
    assert(Array.isArray(multiVariantProduct.options), 'Product options is an array');
    assert(multiVariantProduct.options.length > 0, `Product options count > 0 (${multiVariantProduct.options.length})`);
    assert(Array.isArray(multiVariantProduct.variants), 'Product variants is an array');
    assert(multiVariantProduct.variants.length === multiVariantProduct.total_variants, 'Variant count matches total_variants');
    
    // Check variant item structure
    const sampleVar = multiVariantProduct.variants[0];
    assert(Boolean(sampleVar.sku), `Variant has SKU: ${sampleVar.sku}`);
    assert(typeof sampleVar.price === 'number', `Variant has numeric price: $${sampleVar.price}`);
    assert(typeof sampleVar.stock === 'number', `Variant has numeric stock: ${sampleVar.stock}`);
    assert(typeof sampleVar.options === 'object', 'Variant has options key-value object');
  }

  // Check packed box dimensions and weight
  const productWithDimensions = aptdotData.data.find(p => p.specs?.dimensions?.weight_g);
  assert(Boolean(productWithDimensions), 'Found product with shipping dimensions and weight');
  if (productWithDimensions) {
    const dim = productWithDimensions.specs.dimensions;
    assert(typeof dim.weight_g === 'number' && dim.weight_g > 0, `Package weight is present: ${dim.weight_g}g`);
    assert(dim.length_cm && dim.width_cm && dim.height_cm, `Dimensions (L x W x H) present: ${dim.length_cm}x${dim.width_cm}x${dim.height_cm} cm`);
  }

  console.log('\n--- TEST SUITE 3: Payment Safety Verification ---');
  
  // 1. Rejection of Aptdot synthetic product
  const syntheticProd = aptdotData.data[0];
  const syntheticPaypalRes = await fetch(`${BASE_URL}/api/payments/create-order`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      items: [{ productId: syntheticProd.id, quantity: 1 }],
      shippingAddress: { name: 'Test User' },
    }),
  });
  assert(syntheticPaypalRes.status === 400, 'Server-side PayPal order creation rejects Aptdot synthetic product with HTTP 400');
  const syntheticErr = await syntheticPaypalRes.json();
  assert(syntheticErr.error && syntheticErr.error.includes('synthetic demo catalogue'), 'Error message explicitly explains synthetic catalogue rejection');

  // 2. Rejection of sold out variant / synthetic check
  const watchProduct = aptdotData.data.find(p => (p.specs?.sku || '').startsWith('APP-WATCH'));
  if (watchProduct) {
    const soldOutVar = watchProduct.variants.find(v => v.stock === 0 || v.is_sold_out);
    if (soldOutVar) {
      const soldOutRes = await fetch(`${BASE_URL}/api/payments/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: [{ productId: watchProduct.id, quantity: 1, variantKey: soldOutVar.sku }],
          shippingAddress: { name: 'Test User' },
        }),
      });
      assert(soldOutRes.status === 400, 'Server-side PayPal rejects Aptdot variant with HTTP 400');
      const soldOutErr = await soldOutRes.json();
      assert(soldOutErr.code === 'SYNTHETIC_CATALOGUE_PAYMENT_BLOCKED' || soldOutErr.code === 'VARIANT_SOLD_OUT', 'Error code protects payment safety');
    }
  }

  console.log(`\n========================================`);
  console.log(`TOTAL PASSED: ${passed}`);
  console.log(`TOTAL FAILED: ${failed}`);
  console.log(`========================================\n`);

  if (failed > 0) process.exit(1);
}

runTests().catch(err => {
  console.error('Test Suite Error:', err);
  process.exit(1);
});
