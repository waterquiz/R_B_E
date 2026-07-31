const fs = require('fs');
const sw = fs.readFileSync('sw.js', 'utf8');

// Find z variable definition (the dashboard base URL)
const zIdx = sw.indexOf('const n=z+(e?"#"+e:"")');
if (zIdx >= 0) {
    // find z definition before
    const beforeZ = sw.lastIndexOf(',z=', zIdx);
    if (beforeZ >= 0) {
        console.log("z definition:");
        console.log(sw.substring(Math.max(0, beforeZ - 100), beforeZ + 200));
    } else {
        const zDef = sw.lastIndexOf('z=', zIdx);
        console.log("z def:");
        console.log(sw.substring(Math.max(0, zDef - 100), zDef + 200));
    }
}

// Also find what p is in the script path context of scripts
const openEditorIdx = sw.indexOf('OpenEditor');
const pCtx = sw.substring(Math.max(0, openEditorIdx - 500), openEditorIdx + 100);
console.log("\nContext around OpenEditor (including p variable):");
console.log(pCtx);
