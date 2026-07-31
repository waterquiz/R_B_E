const fs = require('fs');
const sw = fs.readFileSync('sw.js', 'utf8');

const idx = sw.indexOf('async function $l(');
console.log(sw.substring(idx, idx + 1200));
