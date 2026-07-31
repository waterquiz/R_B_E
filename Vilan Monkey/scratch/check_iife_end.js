const fs = require('fs');
let sw = fs.readFileSync('sw.js', 'utf8');

// The IIFE ends with: })()}
// The auto-installer is on lines 2-77 (after the IIFE)
// We need to:
// 1. Remove lines 2-77
// 2. Move the auto-installer INSIDE the IIFE just before the closing })()}

const iifeEnd = '})()}';
const iifeEndIdx = sw.lastIndexOf(iifeEnd);
console.log("IIFE end at:", iifeEndIdx);
console.log("Total length:", sw.length);

// Content after the IIFE end
const afterIIFE = sw.substring(iifeEndIdx + iifeEnd.length);
console.log("Content after IIFE (first 200 chars):", JSON.stringify(afterIIFE.substring(0, 200)));
