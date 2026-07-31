const fs = require('fs');
const sw = fs.readFileSync('sw.js', 'utf8');

// Find the `ua` variable init
// Looking for where ua is first defined with 'let ua' or 'var ua'
let idx = 0;
while (true) {
    const i = sw.indexOf('ua=', idx);
    if (i < 0) break;
    const before = sw[i-1];
    // Look for let ua= or var ua= or ua=... not inside words
    if (before === ' ' || before === ';' || before === ',') {
        console.log(`ua= at ${i} (before: '${before}'):`);
        console.log(sw.substring(Math.max(0, i-30), i+200));
        console.log('---');
    }
    idx = i + 3;
    if (idx > 55000) break;
}
