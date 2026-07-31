const fs = require('fs');
const sw = fs.readFileSync('sw.js', 'utf8');

// ua is set at 50094 in a command handler: [j]: e => { ua = e; ... }
// j is 'isApplied' - so this sets ua (injection active) when isApplied changes
// Let's understand what dispatches this and what triggers initial injection

// Find where j (isApplied="isApplied") is dispatched  
// 'j' is the key "isApplied"
// Check where SetOptions or GetAllOptions affect ua

// Find the function that responds to options change that controls injection
const isApplied = '"isApplied"';
let idx = sw.indexOf(isApplied);
while (idx >= 0) {
    console.log(`"isApplied" at ${idx}:`);
    console.log(sw.substring(Math.max(0, idx-80), idx+200));
    console.log('---');
    idx = sw.indexOf(isApplied, idx + isApplied.length);
}
