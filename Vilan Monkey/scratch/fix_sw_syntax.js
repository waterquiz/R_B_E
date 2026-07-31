const fs = require('fs');
let sw = fs.readFileSync('sw.js', 'utf8');

// Restore Mt
sw = sw.replace(
    'function Mt(e){return`${(e?.custom||{})[f]',
    'function Mt(e){return`${e.custom[f]'
);

fs.writeFileSync('sw.js', sw, 'utf8');
