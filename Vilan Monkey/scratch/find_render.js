const fs = require('fs');
const js = fs.readFileSync('popup/index.js', 'utf8');

// Look for the render function - search for the HTML structure we injected
const bodyIdx = js.indexOf('background:#0b0d11');
if (bodyIdx >= 0) {
    console.log("Custom HTML found at position:", bodyIdx);
    console.log(js.substring(Math.max(0, bodyIdx - 200), bodyIdx + 500));
} else {
    console.log("Custom HTML background:#0b0d11 NOT found");
    // Look for the function that populates the DOM
    const docBodyIdx = js.indexOf('document.body');
    if (docBodyIdx >= 0) {
        console.log("document.body found:");
        console.log(js.substring(Math.max(0, docBodyIdx - 100), docBodyIdx + 400));
    }
}
