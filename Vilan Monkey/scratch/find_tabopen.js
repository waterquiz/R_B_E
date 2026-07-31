const fs = require('fs');
const sw = fs.readFileSync('sw.js', 'utf8');

// Find TabOpen function
const tabOpenIdx = sw.indexOf('async TabOpen(');
console.log("TabOpen function:");
console.log(sw.substring(tabOpenIdx, tabOpenIdx + 800));
