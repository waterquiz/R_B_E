with open('popup/index.js', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

# Replace the L= expression first
text = text.replace('L=(k.runtime.getURL(I.options_ui.page).split("#",1)[0],I.icons[16].replace("16.png",""),"settings")', 'L="settings"')

stack = []
in_str = None
escape = False

for i, ch in enumerate(text):
    if in_str:
        if escape:
            escape = False
        elif ch == '\\\\':
            escape = True
        elif ch == in_str:
            in_str = None
    else:
        if ch in ('"', "'", '`'):
            in_str = ch
        elif ch in '([{':
            stack.append((ch, i))
        elif ch in ')]}':
            if not stack:
                print(f"Unmatched closing '{ch}' at position {i}: {text[max(0, i-40):min(len(text), i+40)]}")
                break
            top, top_pos = stack.pop()
            expected = {'(': ')', '[': ']', '{': '}'}[top]
            if ch != expected:
                print(f"Mismatched closing '{ch}' at {i} (expected '{expected}' for '{top}' at {top_pos}):")
                print("Open context:", text[max(0, top_pos-30):top_pos+40])
                print("Close context:", text[max(0, i-30):i+40])
                break

if stack:
    print(f"Unclosed {len(stack)} items. Last unclosed item '{stack[-1][0]}' opened at {stack[-1][1]}:")
    pos = stack[-1][1]
    print(text[max(0, pos-40):min(len(text), pos+60)])
