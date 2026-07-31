const fs = require('fs');
let js = fs.readFileSync('popup/index.js', 'utf8');
js = js.replace('L=(k.runtime.getURL(I.options_ui.page).split("#",1)[0],I.icons[16].replace("16.png",""),"settings")', 'L="settings"');

// Parse using acorn parser
const acorn = require('acorn');

try {
    acorn.parse(js, { ecmaVersion: 2022 });
    console.log("Acorn Parse SUCCESS!");
} catch (e) {
    console.log("Acorn error at pos:", e.pos, "line:", e.loc?.line, "col:", e.loc?.column);
    console.log("Message:", e.message);
    console.log("Snippet:", js.substring(Math.max(0, e.pos - 100), Math.min(js.length, e.pos + 100)));
}
