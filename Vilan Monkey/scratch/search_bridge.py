import re

file_path = r'C:\Users\frazm\OneDrive\Desktop\Teaser Browser\main.py'
with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

# Look for custom channels, bridge, window.chrome, window.ext, or JavaScript interaction in PyQt
keywords = ['channel', 'bridge', 'js', 'javascript', 'register', 'inject', 'download', 'accept', 'url', 'webengine', 'install']
for kw in keywords:
    matches = list(re.finditer(re.escape(kw), content, re.I))
    print(f"Keyword '{kw}': {len(matches)} matches")

print("\n--- lines containing QWebChannel or bridge or channel ---")
for i, line in enumerate(content.split('\n'), 1):
    if any(k in line.lower() for k in ['channel', 'bridge', 'inject', 'downloadrequested', 'download']):
        # Replace non-ascii chars to avoid print errors
        clean_line = line.encode('ascii', errors='replace').decode('ascii')
        print(f"L{i}: {clean_line.strip()[:150]}")
