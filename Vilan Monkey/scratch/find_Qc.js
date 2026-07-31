const fs = require('fs');
const sw = fs.readFileSync('sw.js', 'utf8');

// Find Qc() function fully and what calls it
const QcIdx = sw.indexOf('function Qc(');
console.log("Qc() function starts at:", QcIdx);
console.log(sw.substring(QcIdx, QcIdx + 200));

// Find all calls to Qc(
let idx = 0;
let count = 0;
while (count < 5) {
    const i = sw.indexOf('Qc(', idx);
    if (i < 0 || i > 105000) break;
    if (i !== QcIdx + 'function '.length) { // skip definition
        console.log(`\nQc( called at ${i}:`);
        console.log(sw.substring(Math.max(0, i-100), i + 150));
    }
    idx = i + 3;
    count++;
}
