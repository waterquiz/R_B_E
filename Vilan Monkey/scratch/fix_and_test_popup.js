const fs = require('fs');

let popup = fs.readFileSync('popup/index.js', 'utf8');

popup = popup.replace('.filter(m)})}),Ze=', '.filter(m)})),Ze=');
fs.writeFileSync('popup/index.js', popup, 'utf8');

try {
    require('child_process').execSync('node -c popup/index.js');
    console.log("popup/index.js syntax SUCCESS!");
} catch (err) {
    console.log("Failed with 2 closing parens, trying 1 closing paren...");
    popup = popup.replace('.filter(m)})),Ze=', '.filter(m)}),Ze=');
    fs.writeFileSync('popup/index.js', popup, 'utf8');
    try {
        require('child_process').execSync('node -c popup/index.js');
        console.log("popup/index.js syntax SUCCESS with 1 closing paren!");
    } catch (err2) {
        console.error("Syntax error still exists:", err2.message);
    }
}
