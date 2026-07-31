const fs = require('fs');
const sw = fs.readFileSync('sw.js', 'utf8');

// Find the actual ne() function - it starts with 'const ne=async'
// The previous search returned the whole file start. Let me search differently
const neIdx = sw.indexOf(',ne=async e=>{');
console.log("ne function definition at:", neIdx);
if (neIdx >= 0) {
    console.log(sw.substring(neIdx, neIdx + 500));
}

// Also try: ne=async e=>
const ne2Idx = sw.indexOf('ne=async e=>');
console.log("\nne=async e=> at:", ne2Idx);
if (ne2Idx >= 0) {
    console.log(sw.substring(ne2Idx, ne2Idx + 500));
}
