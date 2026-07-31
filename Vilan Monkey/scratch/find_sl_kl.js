const fs = require('fs');
const sw = fs.readFileSync('sw.js', 'utf8');

// Find $l function definition
const idx = sw.indexOf('async function $l(');
if (idx >= 0) {
    console.log("$l async function:");
    console.log(sw.substring(idx, idx + 200));
} else {
    // Try other patterns
    const patterns = ['function $l(', 'const $l=', '$l=async', '$l=function'];
    for (const p of patterns) {
        const i = sw.indexOf(p);
        if (i >= 0) {
            console.log(`"${p}" found at ${i}:`);
            console.log(sw.substring(i, i + 200));
            break;
        }
    }
}

// Find kl function
const klidx = sw.indexOf('async function kl(');
if (klidx >= 0) {
    console.log("kl async function:");
    console.log(sw.substring(klidx, klidx + 200));
}
