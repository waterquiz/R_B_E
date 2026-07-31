const fs = require('fs');
const js = fs.readFileSync('popup/index.js', 'utf8');

try {
    new Function(js);
    console.log("SUCCESS! No syntax error!");
} catch (e) {
    console.log("Error message:", e.message);
    console.log("Error stack:", e.stack);
    
    // Find where the syntax breaks using acorn if installed or try catch sliding window
    let low = 0, high = js.length;
    let lastErrPos = -1;
    for (let i = 0; i < js.length; i += 10) {
        try {
            new Function(js.substring(0, i));
        } catch(err) {
            if (err.message.includes('missing ) after argument list')) {
                console.log("First 'missing )' at index:", i);
                console.log("Snippet around i:", js.substring(Math.max(0, i - 80), Math.min(js.length, i + 80)));
                break;
            }
        }
    }
}
