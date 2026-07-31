import os
import zipfile

def zip_dir(path, zip_h):
    for root, dirs, files in os.walk(path):
        # Exclude scratch directory and search/temp scripts
        if 'scratch' in root or '.git' in root:
            continue
        for file in files:
            if file == 'zip_extension.py' or file == 'search_theme.py':
                continue
            fp = os.path.join(root, file)
            rel_path = os.path.relpath(fp, path)
            zip_h.write(fp, rel_path)

zip_path = r'C:\Users\frazm\OneDrive\Desktop\Vilan Monkey\scratch\vilan_monkey.zip'
os.makedirs(os.path.dirname(zip_path), exist_ok=True)

with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
    zip_dir(r'C:\Users\frazm\OneDrive\Desktop\Vilan Monkey', zipf)

print(f"Zip file size: {os.path.getsize(zip_path)} bytes")
