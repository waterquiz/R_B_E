const fs = require('fs');
const sw = fs.readFileSync('sw.js', 'utf8');

['St', '_t', 'Mt', 'ir', 'Il'].forEach(fn => {
    const idx = sw.indexOf(`function ${fn}`);
    if (idx >= 0) {
        console.log(`function ${fn}:`, sw.substring(idx, idx + 100));
    }
});
