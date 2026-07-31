const fs = require('fs');
const sw = fs.readFileSync('sw.js', 'utf8');

const idx = sw.indexOf('function Ml(');
console.log(sw.substring(idx - 50, idx + 400));
