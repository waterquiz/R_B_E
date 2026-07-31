const fs = require('fs');
const sw = fs.readFileSync('sw.js', 'utf8');

// Find Ml function in sw.js
let mlIdx = sw.indexOf('function Ml(');
if (mlIdx >= 0) {
    console.log("Ml function at:", mlIdx);
    console.log(sw.substring(mlIdx, mlIdx + 200));
} else {
    console.log("Ml not found as 'function Ml('");
    // Try const Ml
    mlIdx = sw.indexOf('const Ml=');
    if (mlIdx >= 0) {
        console.log("const Ml= at:", mlIdx);
        console.log(sw.substring(mlIdx, mlIdx + 200));
    }
}
