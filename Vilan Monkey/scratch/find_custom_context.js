const fs = require('fs');
const sw = fs.readFileSync('sw.js', 'utf8');
const popup = fs.readFileSync('popup/index.js', 'utf8');

function findContext(file, filename, term) {
    let pos = 0;
    while ((pos = file.indexOf(term, pos)) !== -1) {
        console.log(`=== ${filename} at ${pos} ===`);
        console.log(file.substring(Math.max(0, pos - 100), Math.min(file.length, pos + 150)));
        console.log('-----------------------------------');
        pos += term.length;
    }
}

findContext(popup, 'popup/index.js', 'custom');
findContext(sw, 'sw.js', '.custom');
