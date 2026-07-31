const fs = require('fs');
const sw = fs.readFileSync('sw.js', 'utf8');

const target = 'managed_default_scripts';
const idx = sw.indexOf(target);
console.log(sw.substring(idx + 1000, idx + 1400));
