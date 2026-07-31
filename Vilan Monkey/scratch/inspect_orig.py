import sys

with open('scratch/render_fn.txt', 'r', encoding='utf-8') as f:
    text = f.read()

idx = text.find('(0,K.pI)(e.list,n=>')
sys.stdout.reconfigure(encoding='utf-8')
print("Original script row render function from render_fn.txt:")
print(text[idx:idx+2000])
