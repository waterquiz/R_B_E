import re

with open(r'C:\Users\frazm\OneDrive\Desktop\theme.xml', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if re.search(r'(monkey|extension|install|download)', line, re.I):
        print(f"Line {i+1}: {line.strip()}")
