const fs = require('fs');
const sw = fs.readFileSync('sw.js', 'utf8');

// Look at dc() more carefully:
// async function dc(e,n){return n[Y]&&await dt(e,t,null,{[J]:0})||await ne()||te(e,"true","document_start").catch(Me)}
// Y = "inject", J = "frameId"
// dt = sendMessage to tab
// ne() = register userScripts
// te() = userScripts.execute()

// The issue is: dc() is called when injected.js communicates with SW
// But if SW is NOT running (was sleeping), the page has already loaded
// When the user clicks popup, that WAKES UP the SW
// Then if they reload, the SW is already awake -> scripts inject

// The REAL fix is to use chrome.runtime.onInstalled to claim clients
// OR to use chrome.tabs.onUpdated to inject scripts on load

// Let's find what handles onUserScriptMessage
const userScriptMsgIdx = sw.indexOf('onUserScriptMessage');
console.log("onUserScriptMessage at:", userScriptMsgIdx);
if (userScriptMsgIdx >= 0) {
    console.log(sw.substring(Math.max(0, userScriptMsgIdx-100), userScriptMsgIdx + 300));
}

// Find if there's an 'activate' event to claim clients
const claimIdx = sw.indexOf('clients.claim');
console.log("\nclients.claim at:", claimIdx);
if (claimIdx >= 0) {
    console.log(sw.substring(Math.max(0, claimIdx-100), claimIdx + 200));
}

// Check the 'on' variable and what activates the SW
const onFuncIdx = sw.indexOf('on=async()=>{');
if (onFuncIdx >= 0) {
    console.log("\non=async()=>{ at:", onFuncIdx);
    console.log(sw.substring(onFuncIdx, onFuncIdx + 300));
}
