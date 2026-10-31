# HIVLO official website (public repo: hivlo-website)
Static site, no build step. Hosted free on GitHub Pages (Settings > Pages > Deploy from branch `main`, folder `/ (root)`). Custom domain: hivlo.co.za (add under Pages settings, then Enforce HTTPS).

## What is here
- `index.html` HIVLO Technologies · `cmp.html` HIVLO CMP · `download.html` how to get and install/update · `updates.html` release notes
- `releases.json` release notes feed · `updates/latest.json` current build, file names, sizes and SHA-256 (metadata only)
- `assets/` styles, scripts, logos, images

## Rules
1. This repo is PUBLIC. Installers, update packages (`.hivlo`), Setup files, keys, the Licence Tool, licence keys, `.env` files, databases and child data NEVER go in. Customers receive installers by private, expiring link; the site only shows checksums.
2. Run `python3 tools/check_public_files.py` before every commit. It must print OK.
3. Post a release with `python3 tools/post_update.py --build ... --date ... --title ... --note ... --update file.hivlo:products` (records name, size and checksum only; never copies the file).
4. Turn on two-step sign-in (passkey) for the GitHub account and keep recovery codes offline.

Brand colours: navy #0B2A4A, gold #F4B400, orange #F7931E, mist #E2E8F0.
