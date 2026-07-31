import subprocess

with open('scratch/render_fn.txt', 'r', encoding='utf-8') as f:
    orig_fn = f.read()

# Read original backup or build valid popup/index.js
with open('popup/index.js', 'r', encoding='utf-8', errors='ignore') as f:
    curr_js = f.read()

# Let's check node syntax check function
def check_js(js_content):
    with open('scratch/temp_test.js', 'w', encoding='utf-8') as out:
        out.write(js_content)
    res = subprocess.run(['node', '-c', 'scratch/temp_test.js'], capture_output=True, text=True)
    return res.returncode == 0, res.stderr

print("Current popup/index.js valid?", check_js(curr_js)[0])
