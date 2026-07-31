const fs = require('fs');
const sw = fs.readFileSync('sw.js', 'utf8');

// Check if Ml is exposed globally
const mlGlobal = sw.indexOf('globalThis.Ml') >= 0 || sw.indexOf('self.Ml') >= 0 || sw.indexOf('window.Ml') >= 0;
console.log("Ml exposed globally:", mlGlobal);

// Check if the loadDefaultScripts references outside the IIFE
const lineOneEnd = sw.indexOf('\n');
const firstLinePart = sw.substring(0, lineOneEnd);
const mlInLineOne = firstLinePart.includes('Ml');
console.log("Ml defined in line 1:", firstLinePart.includes('function Ml') || firstLinePart.includes('const Ml') || firstLinePart.includes('var Ml'));

// Check where Ml is defined
const mlDefIdx = sw.indexOf('function Ml(');
console.log("Ml function at:", mlDefIdx);

// Check if it's inside or outside the IIFE
// The IIFE starts at position 0 with "use strict";{...
const iifeStart = sw.indexOf('"use strict";{');
console.log("IIFE start:", iifeStart);
const iifeEnd = sw.lastIndexOf('})()}');
console.log("IIFE end:", iifeEnd);

if (mlDefIdx >= 0) {
    const isInsideIIFE = mlDefIdx > iifeStart && mlDefIdx < iifeEnd;
    console.log("Ml inside IIFE:", isInsideIIFE);
}

// Check if Bo is inside IIFE  
const boDefIdx = sw.indexOf('const Bo=[],');
if (boDefIdx >= 0) {
    const isInsideIIFE = boDefIdx > iifeStart && boDefIdx < iifeEnd;
    console.log("Bo inside IIFE:", isInsideIIFE, "at:", boDefIdx);
}
