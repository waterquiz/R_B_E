with open(r'C:\Users\frazm\OneDrive\Desktop\Teaser Browser\main.py', 'r', encoding='utf-8', errors='ignore') as f:
    lines = f.readlines()

for i, line in enumerate(lines, 1):
    if 'download' in line.lower():
        print(f"L{i}: {line.strip()}")
