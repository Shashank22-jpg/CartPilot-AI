const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = walk('client/src');
console.log('Total files checked:', files.length);

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  let seenReturn = false;
  let currentFunc = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.match(/^export\s+(default\s+)?function\s+([A-Za-z0-9_]+)/) || line.match(/^function\s+([A-Za-z0-9_]+)/)) {
      seenReturn = false;
      currentFunc = line;
    }
    // Check if line is an early return inside component
    if (line.match(/^if\s*\(.*\)\s*return\b/) || line.match(/^if\s*\(.*\)\s*\{\s*return\b/)) {
      seenReturn = true;
    }
    // Check if hook is called after seenReturn
    if (seenReturn && line.match(/\buse[A-Z][A-Za-z0-9_]*\(/)) {
      console.log(`POTENTIAL VIOLATION in ${file}:${i+1} (${currentFunc}):`);
      console.log(`  Line ${i+1}: ${line}`);
    }
  }
});
