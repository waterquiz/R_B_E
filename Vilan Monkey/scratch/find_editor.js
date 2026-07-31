const fs = require('fs');
const sw = fs.readFileSync('sw.js', 'utf8');

// Find OpenEditor handler
const edIdx = sw.indexOf('OpenEditor');
console.log("OpenEditor context:");
console.log(sw.substring(Math.max(0, edIdx - 50), edIdx + 600));
