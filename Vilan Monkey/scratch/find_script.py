import sys

with open('popup/index.js', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

idx1 = text.find('(e,t)=>((0,K.uX)(),(0,K.CE)("div",{class:(0,S.C4)(["page-popup')
idx2 = text.find('let Ye,Ne,Ve,Je;')
fn_str = text[idx1:idx2]

sys.stdout.reconfigure(encoding='utf-8')
print("Len:", len(fn_str))
with open('scratch/render_fn.txt', 'w', encoding='utf-8') as out:
    out.write(fn_str)
print("Saved render_fn.txt")
