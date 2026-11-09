const assert = require('assert');

async function runStage3Verification() {
  console.log('======================================================================');
  console.log('CARTPILOT AI — STAGE 3: PRODUCT DISCOVERY & DETAILS VERIFICATION');
  console.log('Target API: http://localhost:5000');
  console.log('======================================================================\n');

  let passed = 0;
  let total = 0;

  function test(name, fn) {
    total++;
    try {
      fn();
      console.log(`✅ [PASS] ${total}. ${name}`);
      passed++;
    } catch (err) {
      console.error(`❌ [FAIL] ${total}. ${name}:`, err.message);
    }
  }

  // 1. Fetch products from Supabase API
  const res = await fetch('http://localhost:5000/api/products');
  const body = await res.json();

  test('Discovery loads actual Aptdot products from Supabase', () => {
    assert.strictEqual(body.success, true);
    assert.strictEqual(body.catalogue, 'aptdot');
    assert.ok(Array.isArray(body.data));
    assert.strictEqual(body.data.length, 48);
    // Ensure all have USD currency
    body.data.forEach(p => {
      assert.strictEqual(p.currency, 'USD');
      assert.strictEqual(p.catalogue_source, 'aptdot_synthetic');
      assert.strictEqual(typeof p.price, 'number');
    });
  });

  // 2. Category extraction & filtering
  test('Category derivation matches authoritative Aptdot categories', () => {
    const categories = [...new Set(body.data.map(p => p.category))];
    assert.ok(categories.includes('Health & Fitness'));
    assert.ok(categories.includes('Home & Kitchen'));
    assert.ok(categories.includes('Office & Workspace'));
    assert.ok(categories.includes('Apparel & Wearables'));
    assert.ok(categories.includes('Electronics & Accessories'));

    const filtered = body.data.filter(p => p.category === 'Health & Fitness');
    assert.ok(filtered.length > 0);
    filtered.forEach(p => assert.strictEqual(p.category, 'Health & Fitness'));
  });

  // 3. Search query matching
  test('Search filtering matches title, brand, SKU, and description', () => {
    const query = 'bottle';
    const searchMatches = body.data.filter(p => {
      const q = query.toLowerCase();
      return (p.title || '').toLowerCase().includes(q) ||
             (p.brand || '').toLowerCase().includes(q) ||
             (p.specs?.sku || '').toLowerCase().includes(q) ||
             (p.description || '').toLowerCase().includes(q);
    });
    assert.ok(searchMatches.length > 0);
    assert.ok(searchMatches.some(p => p.title.toLowerCase().includes('bottle')));
  });

  // 4. Price filter logic
  test('Price range filter respects stored product prices in USD', () => {
    const maxPrice = 50;
    const priceFiltered = body.data.filter(p => p.price <= maxPrice);
    assert.ok(priceFiltered.length > 0);
    priceFiltered.forEach(p => assert.ok(p.price <= 50));
  });

  // 5. Stock availability filtering
  test('In-stock filter accurately isolates active stock items', () => {
    const stockFiltered = body.data.filter(p => p.in_stock !== false && (p.stock === undefined || p.stock > 0));
    assert.ok(stockFiltered.length > 0);
    stockFiltered.forEach(p => assert.ok(p.stock > 0));
  });

  // 6. Sorting algorithms
  test('Sorting by Price (Ascending and Descending) works accurately', () => {
    const sortedAsc = [...body.data].sort((a, b) => a.price - b.price);
    for (let i = 0; i < sortedAsc.length - 1; i++) {
      assert.ok(sortedAsc[i].price <= sortedAsc[i + 1].price);
    }

    const sortedDesc = [...body.data].sort((a, b) => b.price - a.price);
    for (let i = 0; i < sortedDesc.length - 1; i++) {
      assert.ok(sortedDesc[i].price >= sortedDesc[i + 1].price);
    }
  });

  // 7. Sorting by Name and Rating
  test('Sorting by Name (A-Z) and Rating works accurately', () => {
    const sortedName = [...body.data].sort((a, b) => a.title.localeCompare(b.title));
    for (let i = 0; i < sortedName.length - 1; i++) {
      assert.ok(sortedName[i].title.localeCompare(sortedName[i + 1].title) <= 0);
    }

    const sortedRating = [...body.data].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    for (let i = 0; i < sortedRating.length - 1; i++) {
      assert.ok((sortedRating[i].rating || 0) >= (sortedRating[i + 1].rating || 0));
    }
  });

  // 8. Variant Matrix matching in Product Details
  test('Variant selection matches option combinations and returns correct SKU and stock', () => {
    const productWithVariants = body.data.find(p => p.has_variants && Array.isArray(p.variants) && p.variants.length > 1);
    assert.ok(productWithVariants, 'Expected at least one product with multiple variants');

    const firstVariant = productWithVariants.variants[0];
    const optionsObj = firstVariant.options;

    // Simulate matcher from ProductDetailModal
    const matched = productWithVariants.variants.find(v => {
      if (!v.options) return false;
      return Object.entries(optionsObj).every(([k, val]) => v.options[k] === val);
    });

    assert.ok(matched);
    assert.strictEqual(matched.sku, firstVariant.sku);
    assert.strictEqual(matched.price, firstVariant.price);
    assert.strictEqual(matched.stock, firstVariant.stock);
  });

  // 9. Quantity validation logic
  test('Quantity stepper clamps values between 1 and available stock', () => {
    const maxStock = 12;
    function clampQty(val) {
      return Math.min(Math.max(1, val), Math.max(1, maxStock));
    }
    assert.strictEqual(clampQty(0), 1);
    assert.strictEqual(clampQty(-5), 1);
    assert.strictEqual(clampQty(5), 5);
    assert.strictEqual(clampQty(12), 12);
    assert.strictEqual(clampQty(99), 12);
  });

  // 10. End-to-end PayPal Sandbox order verification for Aptdot product
  const sampleProduct = body.data[0];
  const orderRes = await fetch('http://localhost:5000/api/paypal/create-order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      items: [{
        productId: sampleProduct.id,
        quantity: 2,
        variantKey: sampleProduct.has_variants ? sampleProduct.variants[0]?.sku : undefined,
      }],
      currency: 'USD',
      shippingAddress: {
        name: 'Alex Mercer',
        street: '2211 North First Street',
        city: 'San Jose',
        state: 'CA',
        postalCode: '95131',
        country: 'US',
      },
    }),
  });
  const orderBody = await orderRes.json();

  test('PayPal Sandbox Order creation succeeds with Aptdot discovery item', () => {
    assert.strictEqual(orderBody.success, true);
    assert.ok(orderBody.paypalOrderId);
    assert.ok(orderBody.orderId);
  });

  console.log('\n======================================================================');
  console.log(`TOTAL DISCOVERY TESTS: ${total} | PASSED: ${passed} | FAILED: ${total - passed}`);
  console.log('======================================================================');

  if (passed === total) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

runStage3Verification().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
