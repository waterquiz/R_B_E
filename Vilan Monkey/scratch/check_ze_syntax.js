const fs = require('fs');
const popup = fs.readFileSync('popup/index.js', 'utf8');

const idx = popup.indexOf('Ze=(0,K.EW)(');
console.log(popup.substring(idx - 50, idx + 50));
