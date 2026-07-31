const fs = require('fs');
const sw = fs.readFileSync('sw.js', 'utf8');

// Show the last 500 chars
console.log("Last 500 chars:", JSON.stringify(sw.substring(sw.length - 500)));

// Find the SECOND occurrence of })() which would close the outer IIFE
// The inner structure has many })() inside
// Find all }) () patterns
let count = 0;
let idx = 0;
while (true) {
    const nextIdx = sw.indexOf('})()}', idx);
    if (nextIdx < 0) break;
    count++;
    console.log(`})()}  found at: ${nextIdx}`);
    idx = nextIdx + 1;
    if (count > 5) break;
}
