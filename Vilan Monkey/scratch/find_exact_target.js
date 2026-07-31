const fs = require('fs');
const sw = fs.readFileSync('sw.js', 'utf8');

// The startup block starts at 60207
// rn.then(async()=>{if(Ic=us(j),Uc=us(yc),Tc=us(bc),Rc=us(vc),Xt.init||(qo(Ec),Ic||jc()),
// We need to add ne() call at startup (not just on install)
// Best place: add ne() call at beginning of rn.then block

const target = 'rn.then(async()=>{if(Ic=us(j)';
const idx = sw.indexOf(target);
console.log("Target found at:", idx);
console.log("Exact target string:", JSON.stringify(sw.substring(idx, idx + 60)));
