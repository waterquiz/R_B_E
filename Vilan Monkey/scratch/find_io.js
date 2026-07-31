const fs = require('fs');
const sw = fs.readFileSync('sw.js', 'utf8');

// Find Io variable - this determines if editor URL triggers a popup window
const ioIdx = sw.indexOf(',Io=');
if (ioIdx >= 0) {
    console.log("Io definition:");
    console.log(sw.substring(ioIdx - 50, ioIdx + 200));
}

// Also find "editorWindow" setting
const ewIdx = sw.indexOf('"editorWindow"');
if (ewIdx >= 0) {
    console.log("\neditorWindow context:");
    console.log(sw.substring(Math.max(0, ewIdx - 100), ewIdx + 400));
}
