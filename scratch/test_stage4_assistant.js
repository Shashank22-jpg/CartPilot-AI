const assert = require('assert');
const fs = require('fs');

async function runStage4Verification() {
  console.log('======================================================================');
  console.log('CARTPILOT AI — STAGE 4: AI ASSISTANT REDESIGN VERIFICATION');
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

  // 1. Inspect AssistantPage source for exact text requirements
  const sourceCode = fs.readFileSync('client/src/pages/AssistantPage.jsx', 'utf8');

  test('Welcome screen headline strictly matches requirement', () => {
    assert.ok(sourceCode.includes('Your smarter shopping journey starts here.'));
  });

  test('Welcome screen supporting text strictly matches requirement', () => {
    assert.ok(sourceCode.includes("Tell CartPilot what you need. I'll help you discover, compare and evaluate products."));
  });

  test('All 4 suggested prompts are defined and accessible', () => {
    assert.ok(sourceCode.includes('Find the best product within my budget.'));
    assert.ok(sourceCode.includes('Compare two products.'));
    assert.ok(sourceCode.includes('Explain product specifications.'));
    assert.ok(sourceCode.includes('Help me evaluate warranty and return details.'));
  });

  test('Motion.dev and reduced motion support are imported and handled', () => {
    assert.ok(sourceCode.includes("import { motion, AnimatePresence, useReducedMotion } from 'motion/react'"));
    assert.ok(sourceCode.includes('const prefersReduced = useReducedMotion()'));
  });

  // 2. Test Gemini Chat endpoint live
  console.log('\nTesting live backend Gemini AI conversation endpoint...');
  const chatRes = await fetch('http://localhost:5000/api/ai/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: 'Find headphones under $200 USD and explain their specifications and warranty.',
      history: [],
      context: { budgetLimit: 3000, spentThisMonth: 150 },
    }),
  });
  const chatBody = await chatRes.json();

  test('Gemini AI Chat API responds with success and structured content', () => {
    assert.strictEqual(chatBody.success, true);
    assert.ok(chatBody.data);
    assert.ok(typeof chatBody.data.reply === 'string');
    assert.ok(chatBody.data.reply.length > 20);
  });

  test('Product recommendations return actual Aptdot database records', () => {
    const recs = chatBody.data.recommendations || [];
    assert.ok(recs.length > 0, 'Expected at least 1 headphone recommendation');
    recs.forEach(p => {
      assert.ok(p.id, 'Product must have an id');
      assert.ok(p.title, 'Product must have a title');
      assert.strictEqual(p.currency, 'USD');
      assert.ok(p.evidence?.source?.includes('Aptdot') || p.tag?.includes('Demo') || p.brand?.includes('Aptdot') || p.specs?.sku);
      assert.ok(typeof p.price === 'number');
    });
  });

  test('Tool-calling activity trace contains verification logs', () => {
    const activityLog = chatBody.data.activityLog || [];
    assert.ok(Array.isArray(activityLog));
    assert.ok(activityLog.length > 0, 'Expected tool execution trace in activityLog');
  });

  // 3. Test Add-to-Cart execution via Gemini
  console.log('\nTesting Gemini add_to_cart tool calling execution...');
  const toolRes = await fetch('http://localhost:5000/api/ai/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: 'Add the Insulated Stainless Steel Water Bottle to my cart',
      history: [],
      context: { budgetLimit: 3000, spentThisMonth: 150 },
    }),
  });
  const toolBody = await toolRes.json();

  test('Gemini executes cart tool and stages authoritative product', () => {
    assert.strictEqual(toolBody.success, true);
    assert.ok(toolBody.data);
    const cartAction = toolBody.data.cartAction;
    assert.ok(cartAction, 'Expected cartAction to be returned');
    assert.strictEqual(cartAction.success, true);
    assert.ok(cartAction.product);
    assert.ok(cartAction.product.id);
    assert.strictEqual(cartAction.product.currency, 'USD');
  });

  console.log('\n======================================================================');
  console.log(`TOTAL ASSISTANT TESTS: ${total} | PASSED: ${passed} | FAILED: ${total - passed}`);
  console.log('======================================================================');

  if (passed === total) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

runStage4Verification().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
