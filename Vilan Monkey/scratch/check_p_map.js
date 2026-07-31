const fs = require('fs');
const popup = fs.readFileSync('popup/index.js', 'utf8');

const idx = popup.indexOf('p=p.map(a=>{');
console.log(popup.substring(idx - 200, idx + 300));
