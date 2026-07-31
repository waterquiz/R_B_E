const fs = require('fs');

let popup = fs.readFileSync('popup/index.js', 'utf8');

popup = popup.replace('totals:m<v?`${m} / ${v}`:`${v}` configuration', 'totals:m<v?`${m} / ${v}`:`${v}`');
popup = popup.replace('totals:`${v}` configuration', 'totals:`${v}`');

fs.writeFileSync('popup/index.js', popup, 'utf8');
