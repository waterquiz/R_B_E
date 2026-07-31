const fs = require('fs');
const sw = fs.readFileSync('sw.js', 'utf8');

// Find No function which is probably window.open
const noIdx = sw.indexOf('function No(');
if (noIdx >= 0) {
    console.log("No() function:");
    console.log(sw.substring(noIdx, noIdx + 400));
} else {
    // Search for where No is defined
    const noMatch = sw.match(/\bNo\s*=/);
    if (noMatch) {
        const idx = sw.indexOf(noMatch[0]);
        console.log("No= definition:");
        console.log(sw.substring(Math.max(0, idx - 50), idx + 400));
    } else {
        console.log("No function not found by direct search");
        // Look for what No does near OpenEditor
        const edIdx = sw.indexOf('OpenEditor');
        const noEdIdx = sw.lastIndexOf('No(', edIdx);
        console.log("Last No( before OpenEditor:");
        console.log(sw.substring(Math.max(0, noEdIdx - 200), noEdIdx + 200));
    }
}
