const fs = require('fs');
const sw = fs.readFileSync('sw.js', 'utf8');

// Find where rn.then is used to run init code after startup
// This is the "ready" promise
const rnThenIdx = sw.indexOf('rn.then(');
console.log("rn.then at:", rnThenIdx);
console.log(sw.substring(rnThenIdx, rnThenIdx + 200));

// Find where Ic is set to a truthy value initially
const IcSetPattern = 'Ic=';
let ixIdx = sw.indexOf('Ic=');
let count = 0;
while (ixIdx >= 0 && count < 10) {
    const before = sw[ixIdx-1];
    if (before !== 'N' && before !== 'W' && before !== 'T' && before !== 'B') {
        console.log(`\nIc= at ${ixIdx} (before: '${before}'):`);
        console.log(sw.substring(Math.max(0, ixIdx-50), ixIdx+200));
        console.log('---');
        count++;
    }
    ixIdx = sw.indexOf('Ic=', ixIdx + 3);
}
