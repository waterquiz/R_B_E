with open(r'C:\Users\frazm\OneDrive\Desktop\Teaser Browser\main.py', 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

lines = content.split('\n')
for i, line in enumerate(lines, 1):
    if 'def inject_all_scripts' in line:
        print(f"Found inject_all_scripts at line {i}")
        for j in range(i-2, i+80):
            if j < len(lines):
                # Replace non-ascii chars to avoid print errors
                clean_line = lines[j].encode('ascii', errors='replace').decode('ascii')
                print(f"L{j+1}: {clean_line}")
