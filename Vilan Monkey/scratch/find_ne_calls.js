const fs = require('fs');
const sw = fs.readFileSync('sw.js', 'utf8');

// Check where ne() is called - the function that registers userScripts
// It's called as ne(e) - need to find where the argument is passed
// ne = async e => { let t; try { t = R.userScripts; if (!t) return null; ...register... } }

// Find what triggers ne() - search for 'await ne(' or 'ne(!0)' or 'ne(true)'
const patterns = ['await ne(', 'ne(!0)', 'ne(!1)', 'ne(true)', 'ne(false)', '=ne(', ',ne('];
for (const p of patterns) {
    const idx = sw.indexOf(p);
    if (idx >= 0) {
        console.log(`Pattern "${p}" at ${idx}:`);
        console.log(sw.substring(Math.max(0, idx-100), idx+200));
        console.log('---');
    }
}

// What calls ne() - look for ne( preceded by various chars
let idx = 0;
let count = 0;
while (count < 5) {
    idx = sw.indexOf('ne(', idx);
    if (idx < 0) break;
    const before = sw[idx-1];
    // only consider ne() calls, not method calls like .ne(
    if (before !== '.' && before !== '"' && before !== "'") {
        console.log(`ne( call at ${idx}, before char: '${before}'`);
        console.log(sw.substring(Math.max(0, idx-30), idx+80));
        console.log('---');
        count++;
    }
    idx++;
}
