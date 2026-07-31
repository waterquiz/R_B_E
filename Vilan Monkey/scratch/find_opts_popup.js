const fs = require('fs');
const js = fs.readFileSync('popup/index.js', 'utf8');

const idx = js.indexOf('options_ui');
if (idx >= 0) {
    console.log("options_ui in popup/index.js:");
    console.log(js.substring(Math.max(0, idx - 100), idx + 300));
} else {
    console.log("options_ui NOT found in popup/index.js");
}
