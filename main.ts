// NusaData, entri lomba make.fun best-national-statistics-site-20261126-0539.
// Program ini menyerahkan situsnya: menyalin app/ dan screenshots/ dari
// sebelah file ini ke direktori keluaran, lalu menulis dossier.json di sana
// dengan buildDossier dari vendor/makefun-frontend.ts. Vendor dibiarkan
// apa adanya, karena gate membangun ulang dossier dengan salinan yang sama
// dan membandingkan byte per byte.
//
// Jalankan dari root repo:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// Di dalam grader, MAKEFUN_OUTPUT_DIR tidak diset dan keluaran jatuh ke /output.
// Dua run harus menghasilkan byte yang identik.

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(out, { recursive: true });
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) {
  cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });
}

// Batas gate (reference/gate.json): hanya text_max_bytes yang membentuk isi
// dossier; sisanya menolak entri yang memang akan ditolak gate (lebih dari
// 4 screenshot atau satu di atas 256 KiB; app/ di atas 993 file atau 16 MiB).
writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 16777216
  })
);
