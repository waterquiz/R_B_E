const fs = require('fs');
const sw = fs.readFileSync('sw.js', 'utf8');

// Find Ic - isApplied current value
const IcIdx = sw.indexOf('let Ic');
if (IcIdx >= 0) {
    console.log("Ic declaration:");
    console.log(sw.substring(IcIdx, IcIdx + 200));
}

// Find ds(j - which sets isApplied setting
const dsJIdx = sw.indexOf('ds(j,');
if (dsJIdx >= 0) {
    console.log("\nds(j, at:", dsJIdx);
    console.log(sw.substring(Math.max(0, dsJIdx - 100), dsJIdx + 200));
}

// Find the Jl function used in initialization
const jcIdx = sw.indexOf('function jc(');
if (jcIdx >= 0) {
    console.log("\njc function:");
    console.log(sw.substring(jcIdx, jcIdx + 300));
}
