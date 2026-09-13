import shutil
from pathlib import Path
root = Path('.').resolve()
zip_root = root / 'extracted_zip'
report = root / 'diff_report.txt'
if not report.exists():
    print('diff_report.txt not found')
    raise SystemExit(1)
with open(report, 'r', encoding='utf-8') as f:
    lines = [l.strip() for l in f if l.strip()]
for line in lines:
    if line.startswith('ADDED: ') or line.startswith('MODIFIED: '):
        path = line.split(': ',1)[1]
        src = zip_root / path
        dst = root / path
        dst.parent.mkdir(parents=True, exist_ok=True)
        try:
            shutil.copy2(src, dst)
            print('COPIED:', path)
        except Exception as e:
            print('ERROR COPY', path, e)
    elif line.startswith('REMOVED_IN_ZIP: '):
        path = line.split(': ',1)[1]
        target = root / path
        if target.exists():
            try:
                target.unlink()
                print('REMOVED:', path)
            except Exception as e:
                print('ERROR REMOVE', path, e)
        else:
            print('SKIP REMOVE (not found):', path)
    else:
        print('UNKNOWN LINE:', line)
print('Done applying diff')
