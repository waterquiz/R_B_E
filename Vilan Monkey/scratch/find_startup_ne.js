const fs = require('fs');
const sw = fs.readFileSync('sw.js', 'utf8');

// The startup sequence is in rn.then() 
// We found it at position 60228: rn.then(async()=>{if(Ic=us(j),...
// We need to also call ne() here to re-register user scripts on SW startup

const startupIdx = sw.indexOf('rn.then(async()=>{if(Ic=us(j)');
console.log("startup code at:", startupIdx);
console.log(sw.substring(startupIdx, startupIdx + 400));

// Also check if ne() is already called in this block
const neInStartup = sw.indexOf('ne(', startupIdx);
if (neInStartup > 0 && neInStartup < startupIdx + 500) {
    console.log("\nne() already in startup at:", neInStartup);
} else {
    console.log("\nne() NOT found in startup block");
}
