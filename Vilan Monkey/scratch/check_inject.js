const fs = require('fs');
const sw = fs.readFileSync('sw.js', 'utf8');

// Check for injected.js and injected-web.js references
const injIdx = sw.indexOf('injected.js');
console.log("injected.js at:", injIdx);
if (injIdx >= 0) {
    console.log(sw.substring(Math.max(0, injIdx-100), injIdx+200));
}

// Check how ne() (userScript register) is called
const neCallIdx = sw.indexOf('ne(');
if (neCallIdx >= 0) {
    console.log("\nne() call:");
    console.log(sw.substring(neCallIdx, neCallIdx+200));
}

// Check ed() function - the init/ready function
const edIdx = sw.indexOf('async function ed()');
if (edIdx >= 0) {
    console.log("\ned() function:");
    console.log(sw.substring(edIdx, edIdx+400));
}
