with open(r'C:\Users\frazm\OneDrive\Desktop\Teaser Browser\main.py', 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

lines = content.split('\n')
for i, line in enumerate(lines, 1):
    if 'def on_extension_added' in line:
        print(f"Found on_extension_added at line {i}")
        for j in range(i-2, i+60):
            if j < len(lines):
                print(f"L{j+1}: {lines[j]}")
