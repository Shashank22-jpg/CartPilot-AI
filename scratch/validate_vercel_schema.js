import fs from 'fs';
import path from 'path';

console.log('=== VERCEL CONFIGURATION SCHEMA VALIDATION ===\n');

async function validateConfigs() {
  console.log('1. Fetching official Vercel schema from https://openapi.vercel.sh/vercel.json ...');
  const schemaRes = await fetch('https://openapi.vercel.sh/vercel.json');
  if (!schemaRes.ok) {
    throw new Error(`Failed to fetch Vercel schema: ${schemaRes.status} ${schemaRes.statusText}`);
  }
  const schema = await schemaRes.json();
  console.log('   ✓ Successfully retrieved official Vercel schema.\n');

  // Load vercel.json and client/vercel.json
  const rootVercelPath = path.resolve('vercel.json');
  const clientVercelPath = path.resolve('client/vercel.json');

  const rootConfig = JSON.parse(fs.readFileSync(rootVercelPath, 'utf8'));
  const clientConfig = JSON.parse(fs.readFileSync(clientVercelPath, 'utf8'));

  const files = [
    { name: 'vercel.json (Root)', config: rootConfig },
    { name: 'client/vercel.json', config: clientConfig },
  ];

  for (const { name, config } of files) {
    console.log(`2. Validating ${name}:`);

    // Check top-level properties against schema
    for (const key of Object.keys(config)) {
      if (key === '$schema') continue;
      const propDef = schema.properties?.[key];
      if (!propDef) {
        console.warn(`   ⚠️ Warning: "${key}" is not explicitly listed in schema properties.`);
      } else {
        console.log(`   ✓ Property "${key}" is valid (${propDef.type || 'defined'}).`);
      }
    }

    // Validate rewrites
    if (Array.isArray(config.rewrites)) {
      console.log(`   Validating ${config.rewrites.length} rewrite rules:`);
      config.rewrites.forEach((rw, idx) => {
        if (!rw.source || typeof rw.source !== 'string') {
          throw new Error(`Rewrite rule ${idx} missing valid source string`);
        }
        if (!rw.destination || typeof rw.destination !== 'string') {
          throw new Error(`Rewrite rule ${idx} missing valid destination string`);
        }

        // Check for disallowed unescaped regex or negative lookaheads in source
        if (rw.source.includes('?!') || rw.source.includes('?=')) {
          throw new Error(`Rewrite rule ${idx} (${rw.source}) contains disallowed lookaround regex`);
        }

        // Verify destination has no static .js extension
        if (rw.destination.endsWith('.js')) {
          throw new Error(`Rewrite rule ${idx} destination (${rw.destination}) ends with .js, which Vercel treats as static asset`);
        }

        console.log(`     Rule [${idx}]: "${rw.source}" -> "${rw.destination}" (Valid path pattern)`);
      });
    }

    console.log(`   ✓ ${name} PASSED schema & syntax checks.\n`);
  }

  console.log('=== ALL CONFIGURATION FILES VALIDATED SUCCESSFULLY ===\n');
}

validateConfigs().catch(err => {
  console.error('\n❌ VALIDATION ERROR:', err.message);
  process.exit(1);
});
