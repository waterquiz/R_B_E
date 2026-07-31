const fs = require('fs');
const sw = fs.readFileSync('sw.js', 'utf8');

// Find the Qc() call I added in the auto-installer
const qcInInstaller = sw.indexOf('// Reload script memory so scripts are immediately available without page reload');
console.log("My Qc() comment at:", qcInInstaller);
if (qcInInstaller >= 0) {
    console.log(sw.substring(qcInInstaller, qcInInstaller + 200));
}

// Also find the setTimeout delay I changed
const delay100 = sw.indexOf('}, 100);');
console.log("\n}, 100); at:", delay100);
