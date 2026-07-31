const fs = require('fs');
const sw = fs.readFileSync('sw.js', 'utf8');

// Search for options_ui in sw.js
const idx = sw.indexOf('options_ui');
if (idx >= 0) {
    console.log("options_ui in sw.js:");
    console.log(sw.substring(Math.max(0, idx - 100), idx + 300));
} else {
    console.log("options_ui NOT found in sw.js");
}
