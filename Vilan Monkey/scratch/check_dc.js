const fs = require('fs');
const sw = fs.readFileSync('sw.js', 'utf8');

// Find dc() - the function called when injected.js connects
const dcIdx = sw.indexOf('async function dc(');
console.log("dc() function:");
if (dcIdx >= 0) {
    console.log(sw.substring(dcIdx, dcIdx + 400));
}

// Find where rn is awaited in dc
const rnAwaitIdx = sw.indexOf('rn&&await rn');
console.log("\nrn&&await rn at:", rnAwaitIdx);
if (rnAwaitIdx >= 0) {
    console.log(sw.substring(Math.max(0, rnAwaitIdx-100), rnAwaitIdx + 200));
}

// Find the oninstall setup - when is ne(!0) called
// Also check if there is a 'fetch' event handler
const fetchIdx = sw.indexOf('.onfetch=');
if (fetchIdx < 0) {
    const fetchIdx2 = sw.indexOf("'fetch'");
    console.log("\n'fetch' event at:", fetchIdx2);
    if (fetchIdx2 >= 0) {
        console.log(sw.substring(fetchIdx2, fetchIdx2+200));
    }
}
