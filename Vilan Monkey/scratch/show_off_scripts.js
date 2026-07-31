const fs = require('fs');

// 1. Fix popup/index.css
let css = fs.readFileSync('popup/index.css', 'utf8');
css = css.replace('.script.disabled,.script.disabled .card{display:none!important}', '');
fs.writeFileSync('popup/index.css', css, 'utf8');
console.log("Updated popup/index.css");

// 2. Fix popup/index.js
let popup = fs.readFileSync('popup/index.js', 'utf8');

// Replace ze filter so disabled scripts are included (not hidden)
const zeIdx = popup.indexOf('ze=(0,K.EW)(');
const zeEndIdx = popup.indexOf(',Ze=(0,K.EW)(', zeIdx);

if (zeIdx >= 0 && zeEndIdx >= 0) {
    const oldZe = popup.substring(zeIdx, zeEndIdx);
    console.log("Old ze substring:", oldZe);

    const newZe = `ze=(0,K.EW)(()=>{const{sort:e,enabledFirst:t,groupRunAt:n,hideDisabled:a}=R[O.nx],{injectable:l}=q,o="group"===a,s=R[O.qL];let i;return[l&&[0,c,(0,C.Ru)("menuMatchedScripts"),o||null],l&&o&&[0,"disabled",(0,C.Ru)("menuMatchedDisabledScripts"),!1],[1,"frameScripts",(0,C.Ru)("menuMatchedFrameScripts")]].filter(m).map(([l,o,u,d])=>{let p=(q[c][l]||[]).filter(e=>e&&e.props&&e.config&&e.custom);p=p.filter(e=>!e.config.removed);const v=p.length,m=null==d?p.reduce((e,t)=>e+t.config.enabled,0):v;return p=p.map(a=>{const l=(0,C.tj)(a),{id:o}=a.props,{enabled:u,removed:c,shouldUpdate:d}=a.config,p=!c&&(0,C.MO)(a,{enabledOnly:s}),v={...a,id:o,name:l,key:\`\${t&&+!u}\${"alpha"===e?l.toLowerCase():n&&r.indexOf((0,C.G8)(a))}\${1e6+a.props.position}\`,excludes:null};return p&&(v.upd=null),p&&d&&(i||(i=q.updatableScripts={}),i[o]=v),v}).sort((e,t)=>f.compare(e.key,t.key)),v&&{depth:l,name:o,title:u,list:p,totals:m<v?\`\${m} / \${v}\`:\`\${v}\` configuration}}).filter(m)})`;

    popup = popup.substring(0, zeIdx) + newZe + popup.substring(zeEndIdx);
    fs.writeFileSync('popup/index.js', popup, 'utf8');
    console.log("Updated popup/index.js");
}
