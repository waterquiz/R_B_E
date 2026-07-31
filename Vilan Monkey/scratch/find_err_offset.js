const fs = require('fs');
const js = fs.readFileSync('popup/index.js', 'utf8');

for (let len = 100; len < js.length; len += 100) {
    try {
        new Function(js.substring(0, len) + "\n;}})();");
    } catch(e) {
        if (!e.message.includes('Unexpected token') && !e.message.includes('Unexpected end of input')) {
            console.log("Syntax error at offset", len, ":", e.message);
            console.log("Snippet:", js.substring(len - 50, len + 50));
            break;
        }
    }
}
