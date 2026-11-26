// NusaData: render tiap halaman.
// Satu fungsi per halaman. Halaman dirender dari data.js dan digambar
// lewat charts.js. Semua teks ditulis langsung, dalam Bahasa Indonesia.

import { KPI, POPULATION, GDP, INFLATION, LABOUR, POVERTY, EDUCATION, HEALTH, TRADE, NAV, SOURCE_LIST, SOURCES } from './data.js';
import { barChart, hbarChart, lineChart, hundredBar } from './charts.js';

function src(text) {
  return '<p class="source">Sumber: ' + text + '</p>';
}

function pageHead(title, lede) {
  return '<div class="page-head"><h1>' + title + '</h1><p class="lede">' + lede + '</p></div>';
}

function kpiCard(item) {
  return '<a class="kpi" href="' + item.route + '"><div class="kpi-label">' + item.label + ' <span class="kpi-period">' + item.period + '</span></div>'
    + '<div class="kpi-value">' + item.value + '</div>'
    + '<div class="kpi-note">' + item.note + '</div>'
    + '<p class="source">Sumber: ' + (item.srcShort || item.source) + '</p></a>';
}

function chartLegend(color, text) {
  return '<p class="legend"><span class="swatch" style="background:' + color + '"></span>' + text + '</p>';
}

function statCard(value, label, source) {
  return '<div class="stat"><div class="stat-value">' + value + '</div>'
    + '<div class="stat-label">' + label + '</div>'
    + '<p class="source">Sumber: ' + source + '</p></div>';
}

function navLinks(current) {
  return NAV.map(function (n) {
    return '<a href="' + n.route + '"' + (n.route === current ? ' class="active" aria-current="page"' : '') + '>' + n.label + '</a>';
  }).join('');
}

export function renderDashboard() {
  const gdpBars = barChart([
    { label: '2024', value: 22139.0, display: 'Rp 22.139,0 T' },
    { label: '2025', value: 23821.1, display: 'Rp 23.821,1 T' }
  ], { label: 'PDB harga berlaku 2024 dan 2025', height: 130 });
  const popBars = hbarChart(POPULATION.top5.map(function (p) {
    return { label: p.name, value: p.value, display: p.display };
  }), { label: 'Lima provinsi dengan penduduk terbanyak, 2024', rowHeight: 30 });
  const top5Total = POPULATION.top5.reduce(function (s, p) { return s + p.value; }, 0);
  const top5Text = (top5Total / 1000000).toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' juta';
  const links = NAV.slice(1).map(function (n) {
    const blurb = {
      '#/penduduk': '284,44 juta jiwa pada 2025',
      '#/ekonomi': 'PDB Rp 23.821,1 T, tumbuh 5,11%',
      '#/kesehatan': 'Umur harapan hidup 74,15 tahun',
      '#/pendidikan': 'Dari 100 remaja 16-18 tahun, 75 bersekolah',
      '#/ketenagakerjaan': 'Pengangguran 4,76% pada Feb 2025',
      '#/harga': 'Inflasi 2,92% pada Des 2025',
      '#/provinsi': 'Penduduk dan PDRB 38 provinsi, bisa dicari dan diurutkan',
      '#/sumber': 'Semua publikasi BPS yang dipakai situs ini'
    }[n.route] || '';
    return '<a class="link-card" href="' + n.route + '"><strong>' + n.label + '</strong><span>' + blurb + '</span></a>';
  }).join('');
  return pageHead('Statistik Indonesia, <span class="nowrap">2024–2025</span>',
    'Angka resmi BPS 2024–2025, lengkap dengan sumber dan tahunnya.')
    + '<div class="kpi-grid">' + KPI.map(kpiCard).join('') + '</div>'
    + '<div class="two-col"><section class="panel"><h2>PDB 2024–2025</h2>'
    + '<div class="chart-wrap">' + gdpBars + '</div>'
    + chartLegend('#0e4a3f', 'Hijau: nilai PDB (level).')
    + '<p>PDB naik dari Rp 22.139,0 T (2024) menjadi Rp 23.821,1 T (2025). Pertumbuhan 5,11%, di atas 5,03% tahun sebelumnya.</p>'
    + src(SOURCES.pdb2025 + '; ' + SOURCES.pdb2024) + '</section>'
    + '<section class="panel"><h2>Penduduk terbanyak ada di Jawa</h2>'
    + '<div class="chart-wrap">' + popBars + '</div>'
    + chartLegend('#0e4a3f', 'Hijau: jumlah penduduk (level).')
    + '<p>Lima provinsi teratas dihuni ' + top5Text + ' orang.</p>'
    + src(SOURCES.penduduk2024) + '</section></div>'
    + '<section class="panel"><h2>Perdagangan: surplus US$ 31,04 miliar pada 2024</h2>'
    + '<p>Ekspor US$ 264,70 miliar, impor US$ 233,66 miliar. Surplus ini sudah berjalan 55 bulan berturut-turut sejak Mei 2020. Komoditas ekspor terbesar adalah batu bara (US$ 30,49 miliar), disusul minyak kelapa sawit (US$ 22,87 miliar).</p>'
    + '<p>Pada 2025, surplus naik menjadi US$ 41,05 miliar menurut laporan sekunder Antara yang mengutip BPS.</p>'
    + src(SOURCES.dagang2024 + '; ' + SOURCES.dagang2025 + '; ' + SOURCES.kemenkeu2024) + '</section>'
    + '<h2>Jelajahi datanya</h2><div class="link-grid">' + links + '</div>';
}

export function renderPenduduk() {
  const bars = hbarChart(POPULATION.top5.map(function (p) {
    return { label: p.name, value: p.value, display: p.display };
  }), { label: 'Lima provinsi dengan penduduk terbanyak, 2024' });
  const rows = POPULATION.top5.concat(POPULATION.next2).map(function (p, i) {
    return '<tr><td>' + (i + 1) + '</td><td>' + p.name + '</td><td class="num">' + p.value.toLocaleString('id-ID') + '</td></tr>';
  }).join('');
  const top3Total = POPULATION.top5.slice(0, 3).reduce(function (s, p) { return s + p.value; }, 0);
  const top3Text = (top3Total / 1000000).toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' juta';
  return pageHead('Penduduk',
    'Indonesia dihuni 284,44 juta jiwa pada pertengahan 2025 menurut proyeksi BPS. Jumlah itu naik dari 281,60 juta pada 2024 dan 270,20 juta pada Sensus 2020.')
    + '<div class="stat-row">'
    + statCard(POPULATION.total2025, 'Penduduk pertengahan 2025 (proyeksi BPS)', SOURCES.penduduk2025)
    + statCard(POPULATION.growth, 'Laju tumbuh penduduk, ' + POPULATION.growthNote, SOURCES.supas2025)
    + statCard(POPULATION.density, 'Kepadatan penduduk, 2024', SOURCES.penduduk2024)
    + statCard(POPULATION.javaShare, 'Penduduk tinggal di Pulau Jawa, 2025 (' + POPULATION.javaPeople + ')', SOURCES.supas2025)
    + '</div>'
    + '<section class="panel"><h2>Lima provinsi terpadat</h2>'
    + '<p>Tiga provinsi teratas semuanya di Pulau Jawa. Jawa Barat, Jawa Timur, dan Jawa Tengah saja sudah ' + top3Text + ' jiwa.</p>'
    + '<div class="chart-wrap">' + bars + '</div>' + chartLegend('#0e4a3f', 'Hijau: jumlah penduduk (level).') + src(SOURCES.penduduk2024) + '</section>'
    + '<section class="panel"><h2>Tabel penduduk provinsi, 2024</h2>'
    + '<div class="table-scroll"><table class="data"><thead><tr><th>No</th><th>Provinsi</th><th class="num">Jiwa</th></tr></thead><tbody>'
    + rows + '</tbody></table></div>' + src(SOURCES.penduduk2024)
    + '<p class="small">Angka 2025 (284,44 juta) memakai seri proyeksi pertengahan tahun BPS. Seri SUPAS 2025 mencatat 284,67 juta; bedanya karena seri yang dipakai berbeda, jadi situs ini memakai satu seri saja di tiap tabel.</p></section>';
}

export function renderEkonomi(year) {
  const y = year === '2024' ? '2024' : '2025';
  const g = GDP.byYear[y];
  const other = y === '2024' ? '2025' : '2024';
  const javaShare = y === '2025' ? GDP.javaShare2025 : GDP.javaShare2024;
  const javaSource = y === '2025' ? SOURCES.javaShare2025 : SOURCES.pdb2024;
  const growthBars = barChart([
    { label: '2024', value: 5.03, display: '5,03%' },
    { label: '2025', value: 5.11, display: '5,11%' }
  ], { label: 'Pertumbuhan PDB 2024 dan 2025', color: '#b4761c', height: 170 });
  const pdrbRows = GDP.pdrb2024.map(function (p, i) {
    return '<tr><td>' + (i + 1) + '</td><td>' + p.name + '</td><td class="num">' + p.value + '</td><td class="num">' + p.share + '</td></tr>';
  }).join('');
  return pageHead('Ekonomi',
    'PDB Indonesia 2025 mencapai Rp 23.821,1 triliun dan tumbuh 5,11%.')
    + '<div class="tabs" role="group" aria-label="Pilih tahun"><button type="button" data-year="2025" aria-pressed="' + (y === '2025') + '">2025</button>'
    + '<button type="button" data-year="2024" aria-pressed="' + (y === '2024') + '">2024</button></div>'
    + '<div class="stat-row">'
    + statCard(g.total, 'PDB harga berlaku, ' + y, g.source)
    + statCard(g.growth, 'Pertumbuhan ekonomi (c-to-c), ' + y, g.source)
    + statCard(g.perCapita, 'PDB per kapita, ' + y + ' (' + g.perCapitaUsd + ')', g.source)
    + statCard(javaShare, 'PDB berasal dari Pulau Jawa, ' + y, javaSource)
    + '</div>'
    + '<div class="two-col"><section class="panel"><h2>Pertumbuhan dua tahun terakhir</h2>'
    + '<div class="chart-wrap">' + growthBars + '</div>'
    + chartLegend('#b4761c', 'Amber: laju pertumbuhan.')
    + '<p>Pertumbuhan 2025 (5,11%) sedikit di atas 2024 (5,03%). Triwulan IV 2025 tumbuh 5,39%.</p>'
    + src(SOURCES.pdb2025 + '; ' + SOURCES.pdb2024) + '</section>'
    + '<section class="panel"><h2>Tahun lainnya</h2>'
    + '<p>Pada ' + other + ', PDB ' + GDP.byYear[other].total + ' dengan pertumbuhan ' + GDP.byYear[other].growth + ' dan PDB per kapita ' + GDP.byYear[other].perCapita + ' (' + GDP.byYear[other].perCapitaUsd + ').</p>'
    + '<p>Triwulan IV 2025 tumbuh ' + GDP.q4_2025 + ' dibanding triwulan yang sama setahun sebelumnya.</p>'
    + '<p>PDB harga konstan 2010 pada 2025 sebesar ' + GDP.constant2025 + '.</p>'
    + src(other === '2025' ? SOURCES.pdb2025 : GDP.byYear[other].source + '; ' + SOURCES.pdb2025) + '</section></div>'
    + '<section class="panel"><h2>Lima provinsi dengan PDRB terbesar, 2024</h2>'
    + '<p>DKI Jakarta memimpin dengan Rp 3.679,35 triliun.</p>'
    + '<div class="table-scroll"><table class="data"><thead><tr><th>No</th><th>Provinsi</th><th class="num">PDRB</th><th class="num">Pangsa nasional</th></tr></thead><tbody>'
    + pdrbRows + '</tbody></table></div>' + src(SOURCES.pdrb2024)
    + '<p class="small">Jumlah PDRB semua provinsi (Rp 22.004 triliun) sedikit di bawah PDB nasional karena ada selisih statistik antara hitungan provinsi dan nasional. Update 2025 dari sumber sekunder (data BPS dibaca lewat Wikipedia): DKI Jakarta Rp 3.926,2 T, Jawa Timur Rp 3.403,2 T, Jawa Barat Rp 3.038,7 T, Jawa Tengah Rp 1.943,2 T, Sumatera Utara Rp 1.236,2 T.</p></section>';
}

export function renderKesehatan() {
  const ipmLine = lineChart([
    { label: '2024', value: 75.02, display: '75,02' },
    { label: '2025', value: 75.90, display: '75,90' }
  ], { label: 'Indeks Pembangunan Manusia 2024 dan 2025', color: '#0e4a3f', height: 220 });
  return pageHead('Kesehatan',
    'Umur harapan hidup orang Indonesia 74,15 tahun pada 2024 menurut seri Indeks Pembangunan Manusia BPS. Angka itu naik menjadi 74,47 tahun pada 2025.')
    + '<div class="stat-row">'
    + statCard(HEALTH.uhh2024, 'Umur harapan hidup saat lahir, 2024 (seri IPM)', SOURCES.ipm2024)
    + statCard(HEALTH.uhh2025, 'Umur harapan hidup saat lahir, 2025 (seri IPM)', SOURCES.ipm2025)
    + statCard(HEALTH.ipm2025, 'Indeks Pembangunan Manusia, 2025', SOURCES.ipm2025)
    + statCard(HEALTH.topProvince, 'IPM provinsi tertinggi, 2025', SOURCES.ipmProvinsi)
    + '</div>'
    + '<section class="panel"><h2>IPM naik dari 75,02 ke 75,90</h2>'
    + '<p>IPM mengukur tiga hal: umur panjang dan hidup sehat, pengetahuan, dan standar hidup layak. Kenaikan 0,88 poin dalam setahun datang dari ketiganya.</p>'
    + '<div class="chart-wrap">' + ipmLine + '</div>' + chartLegend('#0e4a3f', 'Hijau: nilai IPM (level).') + src(SOURCES.ipm2024 + '; ' + SOURCES.ipm2025) + '</section>'
    + '<div class="callout"><p><strong>Catatan seri angka.</strong> Ada laporan lain yang menyebut umur harapan hidup 2024 sebesar 72,39 tahun. Angka itu dari seri dan metode BPS yang berbeda. Situs ini memakai 74,15 tahun, yaitu angka yang dipakai di dalam IPM resmi BPS, supaya satu halaman tidak mencampur dua seri.</p></div>'
    + '<section class="panel"><h2>DKI Jakarta paling tinggi</h2>'
    + '<p>IPM DKI Jakarta 85,05 pada 2025, tertinggi di antara semua provinsi. Jaraknya hampir 10 poin di atas rata-rata nasional 75,90.</p>'
    + src(SOURCES.ipmProvinsi) + '</section>';
}

export function renderPendidikan() {
  const cards = EDUCATION.aps.map(function (a) {
    return '<div class="aps-card"><div class="badge">' + a.ages + ' · ' + a.level + '</div>'
      + '<div class="aps-value">' + a.value + '</div><p>' + a.text + '</p>'
      + '<div>' + hundredBar(a.of100, a.of100 < 80 ? '#b4761c' : '#0e4a3f') + '</div></div>';
  }).join('');
  const litBars = barChart([
    { label: '2024', value: 96.67, display: '96,67%' },
    { label: '2025', value: 97.10, display: '97,10%' }
  ], { label: 'Angka melek aksara usia 15 tahun ke atas', color: '#0e4a3f', height: 220 });
  return pageHead('Pendidikan',
    'Angka partisipasi sekolah (APS) menjawab satu pertanyaan sederhana: dari 100 anak di satu kelompok umur, berapa yang bersekolah. Di usia sekolah dasar hampir semua anak bersekolah, tapi di usia 16-18 tahun sekitar 1 dari 4 remaja tidak sekolah.')
    + '<div class="aps-row">' + cards + '</div>'
    + src(SOURCES.pendidikan2024)
    + '<div class="callout"><p><strong>Yang paling perlu diperhatikan:</strong> penurunan terjadi di usia 16-18 tahun. APS turun dari 96,17% di usia 13-15 tahun menjadi 74,64% di usia 16-18 tahun. Di usia kuliah, 19-23 tahun, hanya 29,01% yang masih bersekolah.</p></div>'
    + '<div class="two-col"><section class="panel"><h2>Melek aksara naik</h2>'
    + '<p>Angka melek aksara penduduk usia 15 tahun ke atas 96,67% pada 2024 dan 97,10% pada 2025. Di kalangan pemuda usia 15-24 tahun, angkanya 99,79% pada 2024.</p>'
    + '<div class="chart-wrap">' + litBars + '</div>' + chartLegend('#0e4a3f', 'Hijau: angka melek aksara (level).') + src(SOURCES.literasi2024 + '; ' + SOURCES.literasi2025 + '; ' + SOURCES.pemuda2024) + '</section>'
    + '<section class="panel"><h2>Lama sekolah</h2>'
    + '<p>Harapan lama sekolah 13,21 tahun pada 2024. Artinya anak yang masuk sekolah hari ini diperkirakan bersekolah selama itu.</p>'
    + '<p>Rata-rata lama sekolah penduduk 8,85 tahun pada 2024, setara kelas 3 SMP. Dua angka ini menjelaskan kenapa APS usia 16-18 tahun penting: banyak yang berhenti sebelum tamat SMA.</p>'
    + src(SOURCES.ipm2024) + '</section></div>';
}

export function renderKetenagakerjaan() {
  const tptBars = barChart([
    { label: 'Feb 2024', value: 4.82, display: '4,82%' },
    { label: 'Feb 2025', value: 4.76, display: '4,76%' }
  ], { label: 'Tingkat pengangguran terbuka Februari 2024 dan 2025', color: '#0e4a3f', height: 220 });
  const feb = LABOUR.feb2025;
  const agu = LABOUR.aug2025;
  return pageHead('Ketenagakerjaan',
    'Tingkat pengangguran terbuka 4,76% pada Februari 2025, terendah sejak krisis 1998 menurut BPS. Pada Agustus 2025 angkanya 4,85%, dengan 7,46 juta orang menganggur dari angkatan kerja 154,00 juta orang.')
    + '<h2>Februari 2025</h2>'
    + '<div class="stat-row">'
    + statCard(feb.tpt, 'Tingkat pengangguran terbuka, Feb 2025', SOURCES.sakernas2025)
    + statCard(feb.unemployed, 'Jumlah penganggur, Feb 2025', SOURCES.sakernas2025)
    + statCard(feb.labourForce, 'Angkatan kerja, Feb 2025', SOURCES.sakernas2025)
    + statCard(feb.employed, 'Penduduk bekerja, Feb 2025', SOURCES.sakernas2025)
    + '</div>'
    + '<h2>Agustus 2025</h2>'
    + '<div class="stat-row">'
    + statCard(agu.tpt, 'Tingkat pengangguran terbuka, Agu 2025', SOURCES.sakernasAgu2025)
    + statCard(agu.unemployed, 'Jumlah penganggur, Agu 2025', SOURCES.sakernasAgu2025)
    + statCard(agu.labourForce, 'Angkatan kerja, Agu 2025', SOURCES.sakernasAgu2025)
    + statCard(agu.employed, 'Penduduk bekerja, Agu 2025', SOURCES.sakernasAgu2025)
    + '</div>'
    + '<div class="two-col"><section class="panel"><h2>Pengangguran turun tipis</h2>'
    + '<p>Dari 4,82% pada Februari 2024 menjadi 4,76% pada Februari 2025. Pengangguran laki-laki 4,98%, perempuan 4,41%.</p>'
    + '<div class="chart-wrap">' + tptBars + '</div>' + chartLegend('#0e4a3f', 'Hijau: tingkat pengangguran (level).') + src(SOURCES.sakernas2025) + '</section>'
    + '<section class="panel"><h2>Pengangguran muda masih tinggi</h2>'
    + '<p>Pengangguran usia 15-24 tahun 16,16% pada Februari 2025, lebih dari tiga kali lipat angka nasional. Penduduk usia kerja 216,79 juta orang pada Februari 2025 dan 218,17 juta orang pada Agustus 2025.</p>'
    + src(SOURCES.sakernas2025 + '; ' + SOURCES.sakernasAgu2025) + '</section></div>'
    + '<section class="panel"><h2>Upah rata-rata Rp 3,09 juta per bulan</h2>'
    + '<p>Upah rata-rata buruh/karyawan Februari 2025 Rp 3,09 juta per bulan, naik tipis dari Rp 3,04 juta setahun sebelumnya. Laki-laki rata-rata Rp 3,37 juta, perempuan Rp 2,61 juta, jadi selisihnya Rp 760 ribu per bulan.</p>'
    + '<p>Upah tertinggi ada di pertambangan dan penggalian (Rp 5,09 juta), terendah di jasa lainnya (Rp 1,81 juta).</p>'
    + '<p>Pada Agustus 2025, upah rata-rata naik menjadi Rp 3,33 juta per bulan.</p>'
    + src(SOURCES.upah2025 + '; ' + SOURCES.sakernasAgu2025)
    + '<h3>Upah minimum provinsi (UMP) 2025</h3>'
    + '<p>Tertinggi ' + LABOUR.umpHigh + ' per bulan. Terendah ' + LABOUR.umpLow + ' per bulan. Rata-rata UMP naik ' + LABOUR.umpRise + '.</p>'
    + src(SOURCES.ump2025) + '</section>';
}

export function renderHarga(year) {
  const y = year === '2025' ? '2025' : '2024';
  const d = INFLATION.byYear[y];
  const bars = barChart([
    { label: 'Des 2023', value: 2.61, display: '2,61%' },
    { label: 'Des 2024', value: 1.57, display: '1,57%' }
  ], { label: 'Inflasi year-on-year Desember 2023 dan 2024', color: '#b4761c', height: 220 });
  return pageHead('Harga dan Inflasi',
    'Inflasi 2024 hanya 1,57%, terendah sepanjang sejarah pencatatan BPS. Indeks Harga Konsumen Desember 2024 berada di 106,80 (2022 = 100).')
    + '<div class="tabs" role="group" aria-label="Pilih tahun"><button type="button" data-year="2024" aria-pressed="' + (y === '2024') + '">2024 (BPS)</button>'
    + '<button type="button" data-year="2025" aria-pressed="' + (y === '2025') + '">2025 (sekunder)</button></div>'
    + '<div class="stat-row">'
    + statCard(d.yoy, 'Inflasi year-on-year Desember, ' + y, d.source)
    + statCard(d.cpi, 'Indeks Harga Konsumen, Des ' + y + ' (2022 = 100)', d.source)
    + statCard(d.core, 'Inflasi inti year-on-year, Des ' + y, d.source)
    + statCard(INFLATION.yoy2023, 'Inflasi year-on-year, Des 2023 (pembanding)', SOURCES.inflasi2023)
    + '</div>'
    + '<section class="panel"><h2>Inflasi turun dari 2,61% ke 1,57%</h2>'
    + '<p>' + d.note + '</p>'
    + '<div class="chart-wrap">' + bars + '</div>' + chartLegend('#b4761c', 'Amber: laju inflasi.') + src(SOURCES.inflasi2024 + '; ' + SOURCES.inflasi2023)
    + (y === '2025' ? '<p class="small">Tab 2025 memakai angka dari laporan sekunder (TVRI/Informasi yang mengutip BPS), bukan dibaca langsung di situs BPS. Angka 2025: inflasi 2,92%, IHK 109,92.</p>' : '')
    + '</section>'
    + '<section class="panel"><h2>Apa artinya 1,57%?</h2>'
    + '<p>Inflasi 1,57% berarti harga barang dan jasa secara umum naik 1,57% dalam setahun. Inflasi inti 2,26% mengukur harga di luar kelompok yang harganya mudah berubah, seperti bahan makanan dan harga yang diatur pemerintah.</p>'
    + src(SOURCES.inflasi2024) + '</section>';
}

function provinceTable(id, title, rows, source) {
  const hasB = rows[0].b !== undefined;
  const body = rows.map(function (r) {
    return '<tr><td>' + r.rank + '</td><td>' + r.name + '</td><td class="num">' + r.a + '</td>' + (hasB ? '<td class="num">' + r.b + '</td>' : '') + '</tr>';
  }).join('');
  return '<section class="panel"><h2>' + title + '</h2>'
    + '<div class="table-scroll"><table class="data" id="' + id + '"><thead><tr>'
    + '<th class="sortable" data-sort="rank" tabindex="0" aria-sort="none">No <span class="sort-arrow" aria-hidden="true"></span></th>'
    + '<th class="sortable" data-sort="name" tabindex="0" aria-sort="none">Provinsi <span class="sort-arrow" aria-hidden="true"></span></th>'
    + '<th class="sortable num" data-sort="a" tabindex="0" aria-sort="none">' + rows[0].aLabel + ' <span class="sort-arrow" aria-hidden="true"></span></th>'
    + (hasB ? '<th class="sortable num" data-sort="b" tabindex="0" aria-sort="none">' + rows[0].bLabel + ' <span class="sort-arrow" aria-hidden="true"></span></th>' : '')
    + '</tr></thead><tbody>' + body + '</tbody></table></div>' + src(source) + '</section>';
}

export function renderProvinsi() {
  const popRows = POPULATION.top5.map(function (p, i) {
    return { rank: i + 1, name: p.name, a: p.value.toLocaleString('id-ID'), aLabel: 'Jiwa', aNum: p.value };
  });
  const pdrbRows = GDP.pdrb2024.map(function (p, i) {
    return { rank: i + 1, name: p.name, a: p.value, b: p.share, aLabel: 'PDRB', bLabel: 'Pangsa nasional', aNum: parseFloat(p.value.replace(/[^0-9,]/g, '').replace(',', '.')), bNum: parseFloat(p.share.replace('%', '').replace(',', '.')) };
  });
  const popJson = JSON.stringify(popRows);
  const pdrbJson = JSON.stringify(pdrbRows);
  return pageHead('Provinsi',
    'Lima provinsi teratas menurut penduduk dan PDRB. Cari lewat kotak di bawah, atau klik judul kolom untuk mengurutkan.')
    + '<div class="search-row"><label for="prov-search">Cari provinsi</label>'
    + '<input id="prov-search" type="search" placeholder="Misal: Jawa" autocomplete="off"></div>'
    + '<div id="prov-tables" data-pop="' + popJson.replace(/"/g, '&quot;') + '" data-pdrb="' + pdrbJson.replace(/"/g, '&quot;') + '">'
    + provinceTable('tbl-pop', 'Penduduk terbanyak, 2024', popRows, SOURCES.penduduk2024)
    + provinceTable('tbl-pdrb', 'PDRB terbesar, 2024', pdrbRows, SOURCES.pdrb2024)
    + '</div>'
    + '<div class="callout"><p><strong>Baca tabel ini dengan benar.</strong> Penduduk dan PDRB memakai tahun yang sama, 2024, tapi dari publikasi yang berbeda. Jawa Barat penduduknya terbanyak, tapi PDRB-nya di bawah DKI Jakarta dan Jawa Timur.</p></div>';
}

export function renderSumber() {
  const rows = SOURCE_LIST.map(function (s) {
    return '<tr><td>' + s.name + '</td><td>' + s.publisher + '</td><td class="num">' + s.year + '</td></tr>';
  }).join('');
  return pageHead('Sumber Data',
    'Semua angka di situs ini berasal dari publikasi di bawah ini. Tiap angka di tiap halaman juga mencantumkan sumber dan tahunnya masing-masing.')
    + '<section class="panel"><h2>Daftar publikasi</h2>'
    + '<div class="table-scroll"><table class="data"><thead><tr><th>Publikasi</th><th>Penerbit</th><th class="num">Tahun</th></tr></thead><tbody>'
    + rows + '</tbody></table></div></section>'
    + '<div class="callout"><p><strong>Tentang sumber sekunder.</strong> Beberapa angka 2025 (PDRB provinsi dan perdagangan) dikutip dari laporan media yang mengutip BPS, karena angka resminya belum dibaca langsung di situs BPS. Di halaman masing-masing, angka itu diberi label sumber sekunder supaya jelas.</p></div>';
}

export const PAGES = {
  dashboard: renderDashboard,
  penduduk: renderPenduduk,
  ekonomi: renderEkonomi,
  kesehatan: renderKesehatan,
  pendidikan: renderPendidikan,
  ketenagakerjaan: renderKetenagakerjaan,
  harga: renderHarga,
  provinsi: renderProvinsi,
  sumber: renderSumber
};

export { navLinks };
