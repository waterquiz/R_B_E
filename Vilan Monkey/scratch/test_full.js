const fs = require('fs');
let js = fs.readFileSync('popup/index.js', 'utf8');

js = js.replace('L=(k.runtime.getURL(I.options_ui.page).split("#",1)[0],I.icons[16].replace("16.png",""),"settings")', 'L="settings"');

try {
    new Function(js);
    console.log("SUCCESS! File is completely valid JavaScript syntax!");
} catch(e) {
    console.log("Error at full file parse:", e.message);
    console.log("Stack:", e.stack);
}
