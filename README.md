# HIVLO official website
Static site (no build step). Free hosting: GitHub Pages (Settings > Pages > deploy from `main`, root).

- `index.html` About · `download.html` Downloads and install/update steps · `updates.html` Release notes
- `releases.json` release notes feed · `updates/latest.json` + `updates/*.hivlo` = the address HIVLO's **Administration > Updates > Check now** reads (set it to `<site>/updates/`)
- `downloads/` first-time Setup installers
- `tools/post_update.py` posts a release (notes + signed files + checksums). It refuses unsigned files and anything that looks like a key or licence tool.

Never publish: the update signing key (`hivlo-update-private.pem`), the Licence Tool, licence keys, or any child data.
Limits: GitHub allows 100 MB per file in a repo (use Releases for bigger files) and 1 GB per site.
