const fs = require('fs');
let js = fs.readFileSync('popup/index.js', 'utf8');

js = js.replace('L=(k.runtime.getURL(I.options_ui.page).split("#",1)[0],I.icons[16].replace("16.png",""),"settings")', 'L="settings"');

for (let i = 0; i < js.length; i += 100) {
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
