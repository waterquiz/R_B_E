const fs = require('fs');
const sw = fs.readFileSync('sw.js', 'utf8');

const idx = sw.indexOf('loadDefaultScripts()');
console.log(sw.substring(idx - 50, idx + 600));
