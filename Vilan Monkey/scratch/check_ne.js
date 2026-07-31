const fs = require('fs');
const sw = fs.readFileSync('sw.js', 'utf8');

// Check the ne() function signature more carefully
const neIdx = sw.indexOf('const ne=async');
console.log("ne() function:");
console.log(sw.substring(neIdx, neIdx + 600));

// Check what ne(!0) vs ne() does differently
// ne(!0) = ne(true) - forces re-registration
// ne() = ne(undefined) - only registers if not already registered

// Check the current startup fix
const startupFix = sw.indexOf('rn.then(async()=>{ne()');
console.log("\nStartup fix at:", startupFix);
if (startupFix >= 0) {
    console.log(sw.substring(startupFix, startupFix + 100));
}
