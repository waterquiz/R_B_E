const fs = require('fs');
const popup = fs.readFileSync('popup/index.js', 'utf8');

const zeIdx = popup.indexOf('ze=(0,K.EW)(');
console.log(popup.substring(zeIdx, zeIdx + 600));
