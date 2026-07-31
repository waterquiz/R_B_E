const fs = require('fs');
const sw = fs.readFileSync('sw.js', 'utf8');

// on() is in a function at 63578. What function is this?
// Let's find the function that contains the 'on()' call at 63578
// Look backwards for 'function' or '=>'
const before = sw.substring(62000, 63600);
console.log("Code before on() call:");
console.log(before.slice(-500)); // last 500 chars before on()

// What calls this function?
// It's probably called from onInstalled or from a storage event

// Look at what calls ed() - probably the service worker startup
const edCallIdx = sw.indexOf('ed()');
console.log("\ned() call at:", edCallIdx);
if (edCallIdx >= 0) {
    console.log(sw.substring(Math.max(0, edCallIdx - 200), edCallIdx + 100));
}

// Check what the actual startup sequence is
// oninstall -> ? -> on() needs to be called
// But on startup (not install), what happens?
const oninstallIdx = sw.indexOf('e.oninstall=');
console.log("\noninstall at:", oninstallIdx);
if (oninstallIdx >= 0) {
    console.log(sw.substring(oninstallIdx, oninstallIdx + 300));
}
