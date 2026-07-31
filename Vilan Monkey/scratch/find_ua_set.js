const fs = require('fs');
const sw = fs.readFileSync('sw.js', 'utf8');

// Now that we know `ua` is declared at 48365, let's find where it's SET to a truthy value
// This is what controls whether injection is active

const uaDeclIdx = 48365;
// Find 'ua=' after declaration
let idx = uaDeclIdx + 10;
let count = 0;
while (count < 10) {
    const i = sw.indexOf('ua=', idx);
    if (i < 0 || i > 55000) break;
    console.log(`ua= at ${i}:`);
    console.log(sw.substring(Math.max(0, i-30), i+150));
    console.log('---');
    idx = i + 3;
    count++;
}

// Also check what da is
const daIdx = sw.indexOf(',da;');
if (daIdx >= 0) {
    console.log("\nda declaration area:");
    console.log(sw.substring(Math.max(0, daIdx-50), daIdx+300));
}
