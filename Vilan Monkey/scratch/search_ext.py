import os
import re

search_dir = r'C:\Users\frazm\OneDrive\Desktop\Vilan Monkey'
keywords = [r'extern', r'connect', r'message', r'install', r'blogger']

for root, dirs, files in os.walk(search_dir):
    if 'scratch' in root or '.git' in root or 'node_modules' in root:
        continue
    for file in files:
        if not file.endswith(('.js', '.json', '.html')):
            continue
        fp = os.path.join(root, file)
        try:
            with open(fp, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
            for kw in keywords:
                matches = list(re.finditer(kw, content, re.I))
                if matches:
                    rel = os.path.relpath(fp, search_dir)
                    print(f"File {rel} matches '{kw}' ({len(matches)} times)")
        except Exception as e:
            pass
