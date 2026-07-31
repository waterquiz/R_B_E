const fs = require('fs');

// 1. Fix sw.js
let sw = fs.readFileSync('sw.js', 'utf8');
const targetQc = `    await (globalThis.browser || globalThis.chrome).storage.local.set({ [storageKey]: currentManagedNames });\n\n    // Reload script memory so scripts are immediately available without page reload\n    if (typeof Qc === 'function') { try { await Qc(); } catch(e) {} }`;
const replacementQc = `    await (globalThis.browser || globalThis.chrome).storage.local.set({ [storageKey]: currentManagedNames });`;

if (sw.includes(targetQc)) {
    sw = sw.replace(targetQc, replacementQc);
    console.log("Successfully removed Qc() call from sw.js");
} else {
    console.log("targetQc not found in sw.js");
}

fs.writeFileSync('sw.js', sw, 'utf8');

// 2. Fix popup/index.js
let popup = fs.readFileSync('popup/index.js', 'utf8');

const targetPopup = `ze=(0,K.EW)(()=>{const{sort:e,enabledFirst:t,groupRunAt:n,hideDisabled:a}=R[O.nx],{injectable:l}=q,o="group"===a,s=R[O.qL];let i;return[l&&[0,c,(0,C.Ru)("menuMatchedScripts"),o||null],l&&o&&[0,"disabled",(0,C.Ru)("menuMatchedDisabledScripts"),!1],[1,"frameScripts",(0,C.Ru)("menuMatchedFrameScripts")]].filter(m).map(([l,o,u,d])=>{let p=q[c][l];null!=d&&(p=p.filter(e=>!e.config.enabled==!d));const v=p.length,m=null==d?p.reduce((e,t)=>e+t.config.enabled,0):v;return"hide"!==a&&!0!==a||(p=p.filter(e=>e.config.enabled)),p=p.map(a=>{const l=(0,C.tj)(a),{id:o}=a.props,{enabled:u,removed:c,shouldUpdate:d}=a.config,p=!c&&(0,C.MO)(a,{enabledOnly:s}),v={...a,id:o,name:l,key:\`\${t&&+!u}\${"alpha"===e?l.toLowerCase():n&&r.indexOf((0,C.G8)(a))}\${1e6+a.props.position}\`,excludes:null};return p&&(v.upd=null),p&&d&&(i||(i=q.updatableScripts={}),i[o]=v),v}).sort((e,t)=>f.compare(e.key,t.key)),v&&{depth:l,name:o,title:u,list:p,totals:m<v?\`\${m} / \${v}\`:\`\${v}\` configuration}}).filter(m)})`;

// Let's find ze definition pattern in popup/index.js
const zeIdx = popup.indexOf('ze=(0,K.EW)(()=>{');
if (zeIdx >= 0) {
    const endIdx = popup.indexOf('}),Ze=(0,K.EW)(', zeIdx);
    console.log("Found ze in popup/index.js from", zeIdx, "to", endIdx);
    const oldZe = popup.substring(zeIdx, endIdx);
    
    // Create bulletproof safe ze mapping
    const newZe = `ze=(0,K.EW)(()=>{const{sort:e,enabledFirst:t,groupRunAt:n,hideDisabled:a}=R[O.nx],{injectable:l}=q,o="group"===a,s=R[O.qL];let i;return[l&&[0,c,(0,C.Ru)("menuMatchedScripts"),o||null],l&&o&&[0,"disabled",(0,C.Ru)("menuMatchedDisabledScripts"),!1],[1,"frameScripts",(0,C.Ru)("menuMatchedFrameScripts")]].filter(m).map(([l,o,u,d])=>{let p=(q[c][l]||[]).filter(e=>e&&e.props&&e.config&&e.custom);p=p.filter(e=>e.config.enabled&&!e.config.removed);const v=p.length,m=v;return p=p.map(a=>{const l=(0,C.tj)(a),{id:o}=a.props,{enabled:u,removed:c,shouldUpdate:d}=a.config,p=!c&&(0,C.MO)(a,{enabledOnly:s}),v={...a,id:o,name:l,key:\`\${t&&+!u}\${"alpha"===e?l.toLowerCase():n&&r.indexOf((0,C.G8)(a))}\${1e6+a.props.position}\`,excludes:null};return p&&(v.upd=null),p&&d&&(i||(i=q.updatableScripts={}),i[o]=v),v}).sort((e,t)=>f.compare(e.key,t.key)),v&&{depth:l,name:o,title:u,list:p,totals:\`\${v}\`}}).filter(m)})`;
    
    popup = popup.substring(0, zeIdx) + newZe + popup.substring(endIdx);
    fs.writeFileSync('popup/index.js', popup, 'utf8');
    console.log("Successfully updated ze in popup/index.js");
} else {
    console.log("ze index not found in popup/index.js");
}
