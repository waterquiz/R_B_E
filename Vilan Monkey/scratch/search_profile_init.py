with open(r'C:\Users\frazm\OneDrive\Desktop\Teaser Browser\main.py', 'r', encoding='utf-8', errors='ignore') as f:
    lines = f.readlines()

for i in range(1803, 1835):
    if i < len(lines):
        print(f"L{i+1}: {lines[i].strip()}")
