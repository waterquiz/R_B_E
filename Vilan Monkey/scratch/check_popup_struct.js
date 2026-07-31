const fs = require('fs');
const js = fs.readFileSync('popup/index.js', 'utf8');

// Check what the popup html looks like now
const popupHtml = fs.readFileSync('popup/index.html', 'utf8');
console.log("popup/index.html:", popupHtml);

// Check if there's any window wrapper code
const windowIdx = js.indexOf('.window');
if (windowIdx >= 0) {
    console.log("\n.window reference:");
    console.log(js.substring(Math.max(0, windowIdx - 100), windowIdx + 200));
}

// Check the popup body structure rendered - look for 'window' class div
const winClassIdx = js.indexOf('"window"');
if (winClassIdx >= 0) {
    console.log("\n\"window\" class:");
    console.log(js.substring(Math.max(0, winClassIdx - 100), winClassIdx + 300));
} else {
    console.log("\n\"window\" class NOT found in popup/index.js");
}
