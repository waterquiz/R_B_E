const fs = require('fs');
const sw = fs.readFileSync('sw.js', 'utf8');

// Find qc function (command handler)
const idx = sw.indexOf('function qc(');
if (idx >= 0) {
    console.log("qc() function:");
    console.log(sw.substring(idx, idx + 800));
}

// Find where the action button click is handled (browser action onClicked)
const actionIdx = sw.indexOf('onClicked');
if (actionIdx >= 0) {
    console.log("\nonClicked:");
    console.log(sw.substring(Math.max(0, actionIdx-100), actionIdx + 400));
}

// Is there a sidePanel reference?
const spIdx = sw.indexOf('sidePanel');
if (spIdx >= 0) {
    console.log("\nsidePanel ref:");
    console.log(sw.substring(Math.max(0, spIdx-100), spIdx + 400));
} else {
    console.log("\nNo sidePanel reference in sw.js");
}
