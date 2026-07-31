with open(r'C:\Users\frazm\OneDrive\Desktop\Teaser Browser\main.py', 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

lines = content.split('\n')
for i, line in enumerate(lines, 1):
    if 'def load_extensions_config' in line:
        print(f"Found load_extensions_config at line {i}")
        for j in range(i-2, i+40):
            if j < len(lines):
                print(f"L{j+1}: {lines[j].strip()}")
