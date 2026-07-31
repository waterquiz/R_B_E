const fs = require('fs');
const js = fs.readFileSync('popup/index.js', 'utf8');

// find L= in popup/index.js  
const idx = js.indexOf(',L=');
if (idx >= 0) {
    console.log("L= in popup/index.js:");
    console.log(js.substring(Math.max(0, idx - 50), idx + 300));
} else {
    console.log("L= not found");
}
