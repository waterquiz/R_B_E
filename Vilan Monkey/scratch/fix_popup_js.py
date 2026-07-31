import subprocess

# We will reconstruct popup/index.js using the original working render_fn.txt
with open('scratch/render_fn.txt', 'r', encoding='utf-8') as f:
    orig_fn = f.read()

# Read current popup/index.js
with open('popup/index.js', 'r', encoding='utf-8', errors='ignore') as f:
    curr = f.read()

idx1 = curr.find('(e,t)=>((0,K.uX)().')
idx2 = curr.find('let Ye,Ne,Ve,Je;')

if idx1 != -1 and idx2 != -1:
    fixed = curr[:idx1] + orig_fn + curr[idx2:]
    with open('popup/index.js', 'w', encoding='utf-8') as out:
        out.write(fixed)

def check():
    res = subprocess.run(['node', '-c', 'popup/index.js'], capture_output=True, text=True)
    print("Valid after restore:", res.returncode == 0)
    if res.returncode != 0:
        print(res.stderr)

check()
