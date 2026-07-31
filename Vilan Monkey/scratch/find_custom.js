const fs = require('fs');
const sw = fs.readFileSync('sw.js', 'utf8');
const popup = fs.readFileSync('popup/index.js', 'utf8');

console.log("Checking popup for .custom:");
let idx = 0;
while ((idx = popup.indexOf('.custom', idx)) !== -1) {
    console.log("popup:", popup.substring(Math.max(0, idx - 40), Math.min(popup.length, idx + 40)));
    idx += 7;
}

console.log("\nChecking sw for .custom:");
idx = 0;
while ((idx = sw.indexOf('.custom', idx)) !== -1) {
    console.log("sw:", sw.substring(Math.max(0, idx - 40), Math.min(sw.length, idx + 40)));
    idx += 7;
}
