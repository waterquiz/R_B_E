with open(r'C:\Users\frazm\OneDrive\Desktop\Teaser Browser\main.py', 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

import re
matches = re.findall(r'class \w+\(QMainWindow\):', content)
print(matches)
