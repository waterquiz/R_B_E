const fs = require('fs');
const sw = fs.readFileSync('sw.js', 'utf8');

// Find dd() function
const ddIdx = sw.indexOf('async function dd(');
if (ddIdx >= 0) {
    console.log("dd() function:");
    console.log(sw.substring(ddIdx, ddIdx + 800));
} else {
    // Try other patterns
    const dd2Idx = sw.indexOf('function dd(');
    if (dd2Idx >= 0) {
        console.log("dd() function:");
        console.log(sw.substring(dd2Idx, dd2Idx + 800));
    }
    
    // Find in onfetch area
    const onfetchIdx = sw.indexOf('e.onfetch=async');
    if (onfetchIdx >= 0) {
        console.log("\nonfetch handler:");
        console.log(sw.substring(onfetchIdx, onfetchIdx + 400));
    }
}

// Also find 'ud' variable - seems to be the get-data.js prefix
const udIdx = sw.indexOf('ud=');
if (udIdx >= 0 && udIdx < 105000) {
    console.log("\nud= at:", udIdx);
    console.log(sw.substring(Math.max(0, udIdx-30), udIdx + 100));
}
