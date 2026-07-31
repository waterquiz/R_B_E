const fs = require('fs');
const sw = fs.readFileSync('sw.js', 'utf8');

// Find Ec function/variable
const EcIdx = sw.indexOf('function Ec(');
if (EcIdx >= 0) {
    console.log("Ec function:");
    console.log(sw.substring(EcIdx, EcIdx + 300));
} else {
    // Try to find Ec definition
    const patterns = ['const Ec=', 'Ec=e=>', 'Ec=async'];
    for (const p of patterns) {
        const idx = sw.indexOf(p);
        if (idx >= 0) {
            console.log(`"${p}" at ${idx}:`);
            console.log(sw.substring(idx, idx + 300));
        }
    }
}

// Find ne() - the userScripts register function
const neIdx = sw.indexOf('const ne=async');
if (neIdx >= 0) {
    console.log("\nne= at:", neIdx);
    console.log(sw.substring(neIdx, neIdx + 400));
}

// Find where Vl.status is set (to 1 = ready)
const vlIdx = sw.indexOf('Vl={status:1}');
if (vlIdx >= 0) {
    console.log("\nVl={status:1} at:", vlIdx);
    console.log(sw.substring(Math.max(0, vlIdx - 100), vlIdx + 200));
}
