const fs = require('fs');
const sw = fs.readFileSync('sw.js', 'utf8');

// Find on function - which sets up on()
// Find how scripts get injected when a page loads
// Key: find the 'activate' and 'fetch' handlers

// Also find Gl() - likely the init function for injection
const GlIdx = sw.indexOf('function Gl(');
if (GlIdx >= 0) {
    console.log("Gl() function:");
    console.log(sw.substring(GlIdx, GlIdx + 400));
}

// Find how scripts are registered with userScripts API
const registerIdx = sw.indexOf('.register([');
if (registerIdx >= 0) {
    console.log("\n.register([:");
    console.log(sw.substring(Math.max(0, registerIdx - 100), registerIdx + 300));
}

// Find what sets P (isFirefox?)
const PIdx = sw.indexOf(',P=!1,');
if (PIdx >= 0) {
    console.log("\nP=!1 at:", PIdx);
    console.log(sw.substring(PIdx, PIdx + 100));
}

// Check ua variable - seems to control userScript mode
const uaIdx = sw.indexOf('ua=');
if (uaIdx >= 0) {
    console.log("\nua= at:", uaIdx);
    console.log(sw.substring(uaIdx, uaIdx + 200));
}
