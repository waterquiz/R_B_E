const fs = require('fs');
const js = fs.readFileSync('popup/index.js', 'utf8');

const idx = js.indexOf('options_ui');
console.log(js.substring(idx - 100, idx + 200));
