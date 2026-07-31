const fs = require('fs');
const sw = fs.readFileSync('sw.js', 'utf8');

// The key is in the oninstall handler: it uses addRoutes
// e.addRoutes?.({condition:{not:{...}},source:"network"})
// This means: for URLs NOT matching *.user.js documents, use NETWORK
// This is the Static Routes API - it bypasses the fetch handler!
// So the fetch handler only fires for get-data.js requests
// All other requests go directly to network

// The actual startup flow must be:
// 1. Browser starts SW
// 2. SW executes the IIFE 
// 3. The IIFE registers event handlers
// 4. A storage read happens to load scripts: this calls on() via the function we found

// Let's find all places that call the function containing on()
// That function is called what? Let's find it
const onCallFuncSearch = sw.substring(62900, 63600);
console.log("Function signature before on():");
// Find 'function' keywords just before on()
let prevFunc = onCallFuncSearch.lastIndexOf('function ');
console.log(onCallFuncSearch.substring(prevFunc, prevFunc + 100));

// Actually, let's look for what directly causes scripts to load
// The Jn.api.set() reads from storage -> when this resolves, it eventually calls on()
// Let's find where the storage read chain starts

// Check the storage.onChanged listener
const storOnChanged = sw.indexOf('.onChanged.addListener(e=>{');
console.log("\nstorage.onChanged at:", storOnChanged);
if (storOnChanged >= 0) {
    console.log(sw.substring(storOnChanged, storOnChanged + 300));
}

// Also look for what calls the function that contains on()
// The function before on() ends with 'on()}'
// This means it's one big function. What calls it?

// Search for the function name - look backward for assignment
const funcSearch = sw.substring(60000, 63580);
// Find all 'function X(' or 'X=function' or 'X=async function' or 'X=('
const funcMatches = funcSearch.match(/function\s+(\w+)\s*\(/g);
console.log("\nFunction declarations in range 60000-63580:");
if (funcMatches) console.log(funcMatches.slice(-5));
