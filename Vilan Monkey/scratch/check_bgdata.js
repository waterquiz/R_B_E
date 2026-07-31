const fs = require('fs');
const js = fs.readFileSync('popup/index.js', 'utf8');

// Check for syntax errors in the render/setup function
// The issue may be that BGDATA is undefined causing a crash
const bgdataIdx = js.indexOf('BGDATA');
console.log("BGDATA usage:");
console.log(js.substring(Math.max(0, bgdataIdx - 50), bgdataIdx + 200));

// Check for any eval or syntax issue spots
const tryIdx = js.indexOf('try{');
if (tryIdx >= 0) {
    console.log("\nFirst try block:");
    console.log(js.substring(tryIdx, tryIdx + 100));
}

// Check for error handling
const errorIdx = js.indexOf('catch(e)');
if (errorIdx >= 0) {
    console.log("\nFirst catch block:");
    console.log(js.substring(errorIdx, errorIdx + 100));
}
