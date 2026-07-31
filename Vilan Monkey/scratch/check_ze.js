const fs = require('fs');
const popup = fs.readFileSync('popup/index.js', 'utf8');

const idx = popup.indexOf('ze=(0,K.EW)(()=>{');
console.log(popup.substring(idx, idx + 800));
