const fs = require('fs');
const sw = fs.readFileSync('sw.js', 'utf8');

// Find where on() is called (not as a method, but the async function)
// on = async () => { await Promise.all(nn.map(...)), e(), rn=null }
// The 'e' in 'on' is the resolver for the 'rn' promise

// Find calls to on()
const onCallIdx = sw.indexOf(',on()');
console.log(",on() at:", onCallIdx);
if (onCallIdx >= 0) {
    console.log(sw.substring(Math.max(0, onCallIdx-200), onCallIdx + 100));
}

// Find what triggers 'on' being called
// Look for 'on()' preceded by various chars
let idx = 0;
let count = 0;
while (count < 10) {
    const i = sw.indexOf('on()', idx);
    if (i < 0 || i > 105000) break;
    const prev2 = sw.substring(Math.max(0,i-2), i);
    // Only look for standalone on() calls, not method calls like .on() or something.on()
    if (prev2[1] !== '.' && prev2[1] !== '"' && prev2[1] !== "'") {
        console.log(`\non() at ${i} (prev2: '${prev2}'):`);
        console.log(sw.substring(Math.max(0, i-50), i + 100));
    }
    idx = i + 4;
    count++;
}
