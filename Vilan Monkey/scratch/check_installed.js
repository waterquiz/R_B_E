const fs = require('fs');
const sw = fs.readFileSync('sw.js', 'utf8');

// Find the onInstalled handler and what it does on install vs update
const installIdx = sw.indexOf('.onInstalled.addListener');
console.log("onInstalled at:", installIdx);
console.log(sw.substring(installIdx, installIdx + 800));

// Find La - which registers user scripts per-script
const LaIdx = sw.indexOf('function La(');
if (LaIdx >= 0) {
    console.log("\nLa function:");
    console.log(sw.substring(LaIdx, LaIdx + 400));
}
