#!/usr/bin/env python3
"""Run before every commit to the PUBLIC website repo. Exits 1 if anything that must never be public is found."""
import pathlib, re, sys
root = pathlib.Path(__file__).resolve().parent.parent
BAD_EXT = {'.pem', '.key', '.p12', '.pfx', '.env', '.db', '.sqlite', '.sqlite3', '.bak', '.zip', '.exe', '.msi', '.hivlo', '.7z', '.tar', '.gz'}
BAD_NAME = re.compile(r'(private|licen[cs]e[-_ ]?tool|signing|secret|password|token|\.env)', re.I)
BAD_TEXT = [re.compile(r'BEGIN (RSA |EC |OPENSSH |ENCRYPTED )?PRIVATE KEY'), re.compile(r'HIVLO1-[A-Za-z0-9_\-]{20,}'), re.compile(r'(ghp_|github_pat_)[A-Za-z0-9_]{20,}')]
TEXT_EXT = {'.html', '.css', '.js', '.json', '.md', '.txt', '.svg', '.py', '.xml', '.cname', ''}
problems = []
for p in root.rglob('*'):
    if not p.is_file() or '.git' in p.parts: continue
    rel = p.relative_to(root).as_posix()
    if p.suffix.lower() in BAD_EXT: problems.append(f'{rel}: file type must never be public')
    if BAD_NAME.search(p.name) and p.name != 'check_public_files.py': problems.append(f'{rel}: name looks like a key, secret or licence tool')
    if p.suffix.lower() in TEXT_EXT and p.stat().st_size < 2_000_000:
        txt = p.read_text(errors='ignore')
        for rx in BAD_TEXT:
            if rx.search(txt) and p.name != 'check_public_files.py': problems.append(f'{rel}: contains text matching {rx.pattern[:30]}')
if problems:
    print('STOP. Do not commit:'); [print(' -', x) for x in problems]; sys.exit(1)
print('OK: no keys, installers, databases or licence text found.')
