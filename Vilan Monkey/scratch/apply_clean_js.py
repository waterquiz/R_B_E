import subprocess

with open('scratch/render_fn.txt', 'r', encoding='utf-8') as f:
    orig_fn = f.read()

with open('popup/index.js', 'r', encoding='utf-8', errors='ignore') as f:
    curr = f.read()

# Fix L= expression first
curr = curr.replace('L=(k.runtime.getURL(I.options_ui.page).split("#",1)[0],I.icons[16].replace("16.png",""),"settings")', 'L="settings"')

# Find start of render function
idx_start = curr.find('(e,t)=>((0,K.uX)(),(0,K.CE)("div",{class:(0,S.C4)(["page-popup')
idx_end = curr.find('let Ye,Ne,Ve,Je;')

if idx_start != -1 and idx_end != -1:
    fixed = curr[:idx_start] + orig_fn + curr[idx_end:]
    with open('popup/index.js', 'w', encoding='utf-8') as out:
        out.write(fixed)

res = subprocess.run(['node', '-c', 'popup/index.js'], capture_output=True, text=True)
print("Node check exit code:", res.returncode)
print("Node stderr:", res.stderr)
