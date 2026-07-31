const fs = require('fs');
let sw = fs.readFileSync('sw.js', 'utf8');

// Add safe optional chaining to St, _t, Mt, ir in sw.js
let count = 0;

// St
if (sw.includes('function St(e){let t,n;return(t=e.custom).homepageURL')) {
    sw = sw.replace(
        'function St(e){let t,n;return(t=e.custom).homepageURL',
        'function St(e){let t,n;return(t=e?.custom||{}).homepageURL'
    );
    count++;
}

// _t
if (sw.includes('function _t(e){return e.custom.name')) {
    sw = sw.replace(
        'function _t(e){return e.custom.name',
        'function _t(e){return e?.custom?.name'
    );
    count++;
}

// Mt
if (sw.includes('function Mt(e){return`${e.custom[f]')) {
    sw = sw.replace(
        'function Mt(e){return`${e.custom[f]',
        'function Mt(e){return`${(e?.custom||{})[f]'
    );
    count++;
}

// ir
if (sw.includes('function ir(e){let t=e.custom.lastInstallURL')) {
    sw = sw.replace(
        'function ir(e){let t=e.custom.lastInstallURL',
        'function ir(e){let t=e?.custom?.lastInstallURL'
    );
    count++;
}

// Il
if (sw.includes('function Il(e,t){const{meta:n}=e,s=t||e.custom.lastInstallURL')) {
    sw = sw.replace(
        'function Il(e,t){const{meta:n}=e,s=t||e.custom.lastInstallURL',
        'function Il(e,t){const{meta:n}=e,s=t||e?.custom?.lastInstallURL'
    );
    count++;
}

console.log(`Updated ${count} helper functions with optional chaining.`);
fs.writeFileSync('sw.js', sw, 'utf8');
