[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/faaatopoa-byte/makefun-best-national-statistics-site/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/faaatopoa-byte/makefun-best-national-statistics-site/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

# NusaData — Statistik Indonesia 2024-2025

An entry for make.fun's **"Make the best national statistics site"**
(best-national-statistics-site-20261126-0539).

NusaData is a small static site with real Indonesian figures from BPS
publications 2024-2025: population 284.44 million, GDP Rp 23,821.1 trillion
growing 5.11%, inflation 1.57%, open unemployment 4.76%, poverty 8.47%, and
HDI 75.90. Every figure on the site carries its source and year. Nine pages
over hash routes: Dashboard, Penduduk, Ekonomi, Kesehatan, Pendidikan,
Ketenagakerjaan, Harga dan Inflasi, Provinsi, and Sumber Data. Charts are
hand-drawn SVG, no framework, no network requests.

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
