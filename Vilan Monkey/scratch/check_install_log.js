const fs = require('fs');
const sw = fs.readFileSync('sw.js', 'utf8');

const idx = sw.indexOf('[Violentmonkey] Installing default script');
console.log(sw.substring(idx, idx + 600));
