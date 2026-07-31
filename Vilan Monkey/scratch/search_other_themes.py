import os
import re

paths = [
    r'C:\Users\frazm\OneDrive\Desktop\Blog Them\theme.xml',
    r'C:\Users\frazm\OneDrive\Desktop\Blog Theme\theme.xml',
    r'C:\Users\frazm\OneDrive\Desktop\Blogger\theme.xml',
]

for p in paths:
    if not os.path.exists(p):
        print(f"Path does not exist: {p}")
        continue
    print(f"\n--- Checking {p} ---")
    with open(p, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    # Check for buttons or scripts with extension or zip or install
    for line_no, line in enumerate(content.split('\n'), 1):
        if any(kw in line.lower() for kw in ['extension', 'install', 'download', 'zip', 'monkey', 'click']):
            print(f"Line {line_no}: {line.strip()[:120]}")
