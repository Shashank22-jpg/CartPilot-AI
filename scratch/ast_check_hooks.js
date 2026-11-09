const fs = require('fs');
const path = require('path');
const parser = require(path.join(__dirname, '../client/node_modules/@babel/parser'));
const traverse = require(path.join(__dirname, '../client/node_modules/@babel/traverse')).default;

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'dist') {
        results = results.concat(walk(fullPath));
      }
    } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = walk('client/src');
console.log('Total files to check:', files.length);

let totalViolations = 0;

files.forEach(file => {
  const code = fs.readFileSync(file, 'utf8');
  let ast;
  try {
    ast = parser.parse(code, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript'],
    });
  } catch (err) {
    console.error(`Parse error in ${file}:`, err.message);
    return;
  }

  // Traverse functions
  traverse(ast, {
    Function(path) {
      const body = path.get('body');
      if (!body.isBlockStatement()) return;

      const statements = body.get('body');
      let returnSeen = false;
      let returnLoc = null;

      statements.forEach(stmt => {
        // Check if this statement can cause an early return
        if (stmt.isReturnStatement()) {
          returnSeen = true;
          returnLoc = stmt.node.loc.start;
        } else if (stmt.isIfStatement()) {
          // Check if consequent or alternate has a return statement
          const consequent = stmt.get('consequent');
          let hasReturn = false;
          if (consequent.isReturnStatement()) {
            hasReturn = true;
          } else if (consequent.isBlockStatement()) {
            consequent.traverse({
              ReturnStatement(retPath) {
                // Ensure the return belongs to this function, not a nested function
                if (retPath.getFunctionParent() === path) {
                  hasReturn = true;
                }
              }
            });
          }
          if (hasReturn) {
            returnSeen = true;
            returnLoc = stmt.node.loc.start;
          }
        }

        // Check for hook call in this statement
        stmt.traverse({
          CallExpression(callPath) {
            const callee = callPath.get('callee');
            let name = '';
            if (callee.isIdentifier()) {
              name = callee.node.name;
            } else if (callee.isMemberExpression()) {
              name = callee.node.property.name;
            }

            if (/^use[A-Z]/.test(name)) {
              // Check if inside conditional or loop
              let parent = callPath.parentPath;
              let isConditional = false;
              let condType = '';
              while (parent && parent !== stmt) {
                if (
                  parent.isIfStatement() ||
                  parent.isConditionalExpression() ||
                  parent.isLogicalExpression() ||
                  parent.isForStatement() ||
                  parent.isForInStatement() ||
                  parent.isForOfStatement() ||
                  parent.isWhileStatement() ||
                  parent.isDoWhileStatement() ||
                  parent.isSwitchCase()
                ) {
                  isConditional = true;
                  condType = parent.type;
                  break;
                }
                parent = parent.parentPath;
              }

              if (isConditional) {
                console.log(`[CONDITIONAL HOOK] ${file}:${callPath.node.loc.start.line}`);
                console.log(`  Hook "${name}" called inside ${condType}`);
                totalViolations++;
              }

              if (returnSeen) {
                console.log(`[HOOK AFTER RETURN] ${file}:${callPath.node.loc.start.line}`);
                console.log(`  Hook "${name}" called after return at line ${returnLoc.line}`);
                totalViolations++;
              }
            }
          }
        });
      });
    }
  });
});

console.log('Done! Total violations found:', totalViolations);
