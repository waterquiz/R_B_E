const fs = require('fs');
const sw = fs.readFileSync('sw.js', 'utf8');

// Find L= in sw.js
const idx = sw.indexOf('L=(k.runtime.getURL(I.options_ui');
if (idx >= 0) {
    console.log("L= expression in sw.js:");
    console.log(sw.substring(idx, idx + 200));
} else {
    // Try optional chaining version
    const idx2 = sw.indexOf('I.options_ui');
    if (idx2 >= 0) {
        console.log("options_ui reference:");
        console.log(sw.substring(Math.max(0, idx2 - 100), idx2 + 200));
    } else {
        console.log("Not found");
    }
}
