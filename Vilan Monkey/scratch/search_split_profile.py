with open(r'C:\Users\frazm\OneDrive\Desktop\Teaser Browser\main.py', 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

lines = content.split('\n')
for i, line in enumerate(lines, 1):
    if 'profile = QWebEngineProfile' in line:
        print(f"Found at line {i}")
        for j in range(i-2, i+25):
            if j < len(lines):
                print(f"L{j+1}: {lines[j]}")
