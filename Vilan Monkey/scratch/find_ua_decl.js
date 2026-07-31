const fs = require('fs');
const sw = fs.readFileSync('sw.js', 'utf8');

// Search for 'let ua' or declaration patterns
const patterns = ['let ua', 'var ua', 'ua,ha', ',ua,', 'ua=!1', 'ua=!0', 'ua=false', 'ua=true'];
for (const p of patterns) {
    const idx = sw.indexOf(p);
    if (idx >= 0) {
        console.log(`"${p}" at ${idx}:`);
        console.log(sw.substring(Math.max(0, idx-50), idx+200));
        console.log('---');
    }
}
