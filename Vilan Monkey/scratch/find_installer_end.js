const fs = require('fs');
const sw = fs.readFileSync('sw.js', 'utf8');

// The auto-installer code ends with:
// await (globalThis.browser || globalThis.chrome).storage.local.set({ [storageKey]: currentManagedNames });
// } catch (err) {
//   console.error('[Violentmonkey] Default script loader error:', err);
// }
// }, 500);
// })()}

// We need to add Qc() call after the storage.set line
// But Qc() is a top-level function in the IIFE, and the auto-installer is also in the IIFE
// So we can call Qc() directly

const installerEnd = sw.indexOf("await (globalThis.browser || globalThis.chrome).storage.local.set({ [storageKey]: currentManagedNames });");
console.log("installer end at:", installerEnd);
if (installerEnd >= 0) {
    console.log(sw.substring(installerEnd, installerEnd + 200));
}
