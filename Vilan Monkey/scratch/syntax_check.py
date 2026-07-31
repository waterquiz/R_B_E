import subprocess

code = '''
const fs = require('fs');
const code = fs.readFileSync('popup/index.js', 'utf8');

// Find error by slicing characters
let low = 0, high = code.length;
while (low < high) {
    let mid = Math.floor((low + high) / 2);
    let testChunk = code.substring(0, mid);
    try {
        new Function(testChunk + '\\n})}');
        low = mid + 1;
    } catch(e) {
        if (e.message.includes('missing ) after argument list')) {
            high = mid;
        } else {
            low = mid + 1;
        }
    }
}
console.log("Error offset around:", high);
console.log("Snippet around error:", code.substring(Math.max(0, high - 100), Math.min(code.length, high + 100)));
'''
res = subprocess.run(['node', '-e', code], capture_output=True, text=True)
print("Node output:", res.stdout)
