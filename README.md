[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/faaatopoa-byte/makefun-best-national-statistics-site/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/faaatopoa-byte/makefun-best-national-statistics-site/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

# NusaData — Statistik Indonesia 2024-2025

An entry for make.fun's **"Make the best national statistics site"**
(best-national-statistics-site-20261126-0539).

NusaData is a small static site with real Indonesian figures from BPS
publications 2024-2025: population 284.44 million, GDP Rp 23,821.1 trillion
growing 5.11%, inflation 2.92% (Dec 2025), open unemployment 4.76%
(Feb 2025), poverty 8.25% (Sep 2025), and HDI 75.90. Every figure on the
site carries its source and year. Nine pages over hash routes: Dashboard,
Penduduk, Ekonomi, Kesehatan, Pendidikan, Ketenagakerjaan, Harga dan
Inflasi, Provinsi, and Sumber Data. Charts are hand-drawn SVG, no
framework, no network requests.

## First-load budget (measured, from dossier Totals)

First load is 6 files, 16.8 KB gzip-9 (57.2 KB raw): index.html, style.css,
main.js, views.js, data.js, charts.js. Nothing loads later by `import()`.
The whole app is 7 files, 57.4 KB (the 7th file is the 214-byte favicon).
There are 0 absolute URLs in the source.

## Files at the repo root

- `main.ts` — hands in the entry: copies `app/` and `screenshots/` to the
  output directory and writes `dossier.json` with the vendored library.
- `serve.ts` — tiny local static server for `app/` (Node stdlib only).
- `shots.json` — the 4 screenshots the entry hands in, with their page
  and viewport each.
- `vendor/` — the vendored make.fun dossier library, used unchanged.

Run it locally:

```sh
node serve.ts
```

Then open http://localhost:8080.

Hand in the entry (as the grader runs it):

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` copies `app/` and `screenshots/` to the output directory and
writes `dossier.json` with the vendored make.fun library.
