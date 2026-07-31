const fs = require('fs');
const sw = fs.readFileSync('sw.js', 'utf8');

const idx = sw.indexOf('storageKey');
console.log(sw.substring(idx + 500, idx + 1200));
