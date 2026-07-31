const fs = require('fs');
const sw = fs.readFileSync('sw.js', 'utf8');

// on() is called at 63578. Let's see the full context
console.log("Context around on() call at 63578:");
console.log(sw.substring(63300, 63700));

// Also check ed() - the init function
const edIdx = sw.indexOf('async function ed(');
console.log("\ned() function:");
if (edIdx >= 0) {
    console.log(sw.substring(edIdx, edIdx + 400));
}
