const fs = require('fs');
const js = fs.readFileSync('popup/index.js', 'utf8');

// Find the main render/init function that builds the UI 
// Look for innerHTML or createHtml etc
const inner = js.indexOf('innerHTML');
const header = js.indexOf('.header');
const container = js.indexOf('.container');
const brand = js.indexOf('.brand');

console.log("innerHTML at:", inner);
console.log(".header at:", header);
console.log(".container at:", container);  
console.log(".brand at:", brand);

if (inner >= 0) {
    console.log("\ninnerHTML context:");
    console.log(js.substring(Math.max(0, inner-100), inner+500));
}

// Find what is rendered initially - look for where we inject the custom HTML
const hanoIdx = js.indexOf('hanomonkey');
const customIdx = js.indexOf('script-list');
console.log("\nhanomonkey at:", hanoIdx);
console.log("script-list at:", customIdx);
