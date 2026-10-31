#!/usr/bin/env python3
"""Post a HIVLO release: adds release notes, copies signed update files, refreshes updates/latest.json.
Only signed .hivlo files are accepted for updates. Private keys are refused."""
import argparse, hashlib, json, pathlib, shutil, sys
root = pathlib.Path(__file__).resolve().parent.parent
def sha(p):
    h = hashlib.sha256()
    with open(p, 'rb') as f:
        for c in iter(lambda: f.read(1 << 20), b''): h.update(c)
    return h.hexdigest()
def bad(msg): sys.exit('REFUSED: ' + msg)
ap = argparse.ArgumentParser()
ap.add_argument('--build', required=True); ap.add_argument('--date', required=True)
ap.add_argument('--title', required=True); ap.add_argument('--kind', default='feature', choices=['feature', 'fix', 'security'])
ap.add_argument('--summary', default=''); ap.add_argument('--note', action='append', default=[])
ap.add_argument('--update', action='append', default=[], metavar='FILE.hivlo:PRODUCTS', help='PRODUCTS = none | inventory | reports | inventory,reports')
ap.add_argument('--setup'); ap.add_argument('--dry-run', action='store_true')
a = ap.parse_args()
variants = []
for spec in a.update:
    path, _, prod = spec.rpartition(':')
    p = pathlib.Path(path)
    if not p.is_file(): bad(f'{path} not found')
    if p.suffix != '.hivlo': bad(f'{p.name} is not a signed .hivlo file')
    if p.read_bytes()[:10] != b'HIVLOUPD1\n': bad(f'{p.name} lacks the HIVLO signature header')
    products = [] if prod in ('', 'none') else sorted(prod.split(','))
    if any(x not in ('inventory', 'reports') for x in products): bad('unknown product in ' + spec)
    variants.append({'products': products, 'file': p.name, 'sha256': sha(p), 'size': p.stat().st_size, 'src': p})
setup = None
if a.setup:
    p = pathlib.Path(a.setup)
    if not p.is_file(): bad('setup file not found')
    if any(k in p.name.lower() for k in ('private', 'key', '.pem', 'licence-tool', 'license-tool', 'signing')): bad(p.name + ' must never be published')
    setup = {'file': p.name, 'sha256': sha(p), 'size': p.stat().st_size, 'src': p}
if a.dry_run: print(json.dumps({'variants': [{k: v for k, v in x.items() if k != 'src'} for x in variants], 'setup': setup and {k: v for k, v in setup.items() if k != 'src'}}, indent=1)); sys.exit()
rj = root / 'releases.json'; rel = json.loads(rj.read_text())
rel['releases'] = [r for r in rel['releases'] if r['build'] != a.build]
rel['releases'].insert(0, {'build': a.build, 'date': a.date, 'kind': a.kind, 'title': a.title, 'summary': a.summary, 'notes': a.note})
rel['releases'].sort(key=lambda r: [int(x) for x in r['build'].split('.')], reverse=True)
rj.write_text(json.dumps(rel, indent=1, ensure_ascii=False) + '\n')
if variants or setup:
    (root / 'updates').mkdir(exist_ok=True); (root / 'downloads').mkdir(exist_ok=True)
    for v in variants: shutil.copy2(v.pop('src'), root / 'updates' / v['file'])
    if setup: shutil.copy2(setup.pop('src'), root / 'downloads' / setup['file'])
    notes = '; '.join(a.note)[:500]
    for v in variants: v['notes'] = notes
    (root / 'updates' / 'latest.json').write_text(json.dumps({'build': a.build, 'published': a.date, 'variants': variants, 'setup': setup}, indent=1) + '\n')
print('Posted build', a.build)
