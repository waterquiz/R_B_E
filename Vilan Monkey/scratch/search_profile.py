with open(r'C:\Users\frazm\OneDrive\Desktop\Teaser Browser\main.py', 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

lines = content.split('\n')
for i, line in enumerate(lines, 1):
    if 'QWebEngineProfile' in line or 'self.main_profile' in line:
        print(f"L{i}: {line.strip()}")
