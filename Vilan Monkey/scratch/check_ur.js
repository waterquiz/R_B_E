const fs = require('fs');
const sw = fs.readFileSync('sw.js', 'utf8');

const idx = sw.indexOf('function ur(');
console.log(sw.substring(idx, idx + 400));
