import re

file_path = r'C:\Users\frazm\OneDrive\Desktop\Teaser Browser\main.py'
with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

print("File size:", len(content))

# Look for chromium, chrome, subprocess, load-extension, options, etc.
keywords = ['chromium', 'chrome', 'load-extension', 'extension', 'subprocess', 'selenium', 'playwright', 'puppeteer', 'start']
for kw in keywords:
    matches = list(re.finditer(re.escape(kw), content, re.I))
    print(f"Keyword '{kw}' found {len(matches)} times")

# Let's print lines containing 'extension' or 'load-extension'
print("\n--- lines containing extension/load-extension ---")
for i, line in enumerate(content.split('\n'), 1):
    if 'extension' in line.lower():
        print(f"L{i}: {line.strip()[:150]}")
