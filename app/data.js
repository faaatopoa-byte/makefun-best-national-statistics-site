// NusaData: semua angka situs ini.
// Setiap angka membawa sumber dan tahunnya. Sumber ditulis sebagai teks,
// tanpa tautan. Angka diambil dari publikasi BPS 2024-2025; angka dari
// sumber sekunder diberi label jelas di kolom sumbernya.

export const SOURCES = {
  penduduk2025: 'BPS, Jumlah Penduduk Pertengahan Tahun, 2025',
  supas2025: 'BPS, SUPAS 2025, BRS No. 51/05/Th. XXIX, 5 Mei 2026',
  penduduk2024: 'BPS, Proyeksi Penduduk Interim 2020-2023, 2024',
  sensus2020: 'BPS, Sensus Penduduk 2020',
  pdb2025: 'BPS, BRS 5 Feb 2026',
  pdb2024: 'BPS, BRS 5 Feb 2025',
  inflasi2024: 'BPS, BRS No. 01/01/Th. XXVIII, 2 Jan 2025',
  inflasi2023: 'BPS, via Bank Indonesia, Des 2023',
  inflasi2025: 'BPS, dilaporkan TVRI/Informasi, 2025 (sumber sekunder)',
  sakernas2025: 'BPS, BRS No. 44/05/Th. XXVIII, 5 Mei 2025 (Sakernas Feb 2025)',
  kemiskinan2025: 'BPS, Profil Kemiskinan, 25 Jul 2025 (Susenas Mar 2025)',
  kemiskinanSep2025: 'BPS, dilaporkan media, Sep 2025 (sumber sekunder)',
  pendidikan2024: 'BPS, Statistik Pendidikan 2024 (Susenas)',
  literasi2024: 'BPS, Tabel Angka Melek Aksara, 2024',
  literasi2025: 'BPS, Tabel Angka Melek Aksara, 2025',
  pemuda2024: 'BPS, Statistik Pemuda Indonesia 2024',
  ipm2024: 'BPS, Indeks Pembangunan Manusia 2024',
  ipm2025: 'BPS, Indeks Pembangunan Manusia 2025, BRS 5 Nov 2025',
  ipmProvinsi: 'BPS, IPM menurut Provinsi, 2025',
  pdrb2024: 'BPS, Buletin PUSAKA BPS Kota Jakarta Pusat, Agu 2025',
  pdrb2025: 'BPS, Seri PDRB Regional 2025, via Wikipedia (sumber sekunder)',
  dagang2024: 'BPS, via Kementerian Perdagangan, Laporan Bulanan PDSI, 2024',
  dagang2025: 'BPS, via Antara, 2025 (sumber sekunder)',
  komoditas2024: 'BPS, data ekspor 2024',
  upah2025: 'BPS, BRS No. 44/05/Th. XXVIII, 5 Mei 2025 (Sakernas)',
  ump2025: 'Kemenaker, Permenaker No. 16/2024, 2025',
  kemenkeu2024: 'Kemenkeu (BKF), mengutip BPS, Nov 2024'
};

export const KPI = [
  { label: 'Penduduk', value: '284,44 jt', note: 'pertengahan tahun, proyeksi BPS', source: SOURCES.penduduk2025, route: '#/penduduk' },
  { label: 'PDB', value: 'Rp 23.821,1 T', note: 'harga berlaku, tumbuh 5,11%', source: SOURCES.pdb2025, route: '#/ekonomi' },
  { label: 'Inflasi', value: '1,57%', note: 'tahun kalender, terendah sepanjang sejarah BPS', source: SOURCES.inflasi2024, route: '#/harga' },
  { label: 'Pengangguran (TPT)', value: '4,76%', note: 'Feb 2025, terendah sejak krisis 1998', source: SOURCES.sakernas2025, route: '#/ketenagakerjaan' },
  { label: 'Kemiskinan', value: '8,47%', note: 'Mar 2025, 23,85 juta orang', source: SOURCES.kemiskinan2025, route: '#/ekonomi' },
  { label: 'IPM', value: '75,90', note: '2025, naik dari 75,02 pada 2024', source: SOURCES.ipm2025, route: '#/kesehatan' }
];

export const POPULATION = {
  total2025: '284,44 juta',
  total2024: '281,60 juta',
  growth: '1,08% per tahun',
  growthNote: 'rata-rata 2020-2025',
  density: '149 jiwa per km persegi',
  javaShare: '55,65%',
  javaPeople: '158,41 juta',
  census2020: '270,20 juta',
  top5: [
    { name: 'Jawa Barat', value: 50345200, display: '50,35 jt' },
    { name: 'Jawa Timur', value: 41814500, display: '41,81 jt' },
    { name: 'Jawa Tengah', value: 37892300, display: '37,89 jt' },
    { name: 'Sumatera Utara', value: 15588500, display: '15,59 jt' },
    { name: 'Banten', value: 12431400, display: '12,43 jt' }
  ],
  next2: [
    { name: 'DKI Jakarta', value: 10684900, display: '10,68 jt' },
    { name: 'Sulawesi Selatan', value: 9463400, display: '9,46 jt' }
  ]
};

export const GDP = {
  byYear: {
    2024: { total: 'Rp 22.139,0 T', growth: '5,03%', perCapita: 'Rp 78,62 jt', perCapitaUsd: 'US$ 4.960,33', source: SOURCES.pdb2024 },
    2025: { total: 'Rp 23.821,1 T', growth: '5,11%', perCapita: 'Rp 83,7 jt', perCapitaUsd: 'US$ 5.083,4', source: SOURCES.pdb2025 }
  },
  constant2025: 'Rp 13.580,5 T',
  q4_2025: '5,39% (y-on-y)',
  javaShare2024: '57,04%',
  pdrb2024: [
    { name: 'DKI Jakarta', value: 'Rp 3.679,35 T', share: '16,71%' },
    { name: 'Jawa Timur', value: 'Rp 3.168,30 T', share: '14,39%' },
    { name: 'Jawa Barat', value: 'Rp 2.823,34 T', share: '12,82%' },
    { name: 'Jawa Tengah', value: 'Rp 1.817,78 T', share: '8,25%' },
    { name: 'Sumatera Utara', value: 'Rp 1.146,92 T', share: '5,21%' }
  ],
  pdrb2025: [
    { name: 'DKI Jakarta', value: 'Rp 3.926 T', share: '-' },
    { name: 'Jawa Timur', value: 'Rp 3.403 T', share: '-' },
    { name: 'Jawa Barat', value: 'Rp 3.039 T', share: '-' },
    { name: 'Jawa Tengah', value: 'Rp 1.943 T', share: '-' },
    { name: 'Sumatera Utara', value: 'Rp 1.236 T', share: '-' }
  ]
};

export const INFLATION = {
  byYear: {
    2024: { yoy: '1,57%', cpi: '106,80', core: '2,26%', note: 'Terendah sepanjang sejarah pencatatan BPS.', source: SOURCES.inflasi2024 },
    2025: { yoy: '2,92%', cpi: '109,92', core: '-', note: 'Angka 2025 dari laporan sekunder, bukan dibaca langsung di situs BPS.', source: SOURCES.inflasi2025 }
  },
  yoy2023: '2,61%'
};

export const LABOUR = {
  tpt: '4,76%',
  tpt2024: '4,82%',
  unemployed: '7,28 juta orang',
  labourForce: '153,05 juta orang',
  employed: '145,77 juta orang',
  workingAge: '216,79 juta orang',
  youth: '16,16%',
  men: '4,98%',
  women: '4,41%',
  wageAvg: 'Rp 3,09 jt',
  wageMen: 'Rp 3,37 jt',
  wageWomen: 'Rp 2,61 jt',
  wageMining: 'Rp 5,09 jt',
  wageServices: 'Rp 1,81 jt',
  wage2024: 'Rp 3,04 jt',
  umpHigh: 'DKI Jakarta, Rp 5.396.761',
  umpLow: 'Jawa Tengah, Rp 2.169.349',
  umpRise: '+6,5% dari 2024'
};

export const POVERTY = {
  rate: '8,47%',
  people: '23,85 juta orang',
  line: 'Rp 609.160 per kapita per bulan',
  urban: '6,73%',
  rural: '11,03%',
  extreme: '0,85% (2,38 juta orang)',
  rate2024: '9,03%',
  rateSep2025: '8,25% (23,36 juta orang)'
};

export const EDUCATION = {
  aps: [
    { ages: '7-12 tahun', level: 'Sekolah dasar', value: '99,19%', of100: 99, text: 'Dari 100 anak usia 7-12 tahun, 99 bersekolah.' },
    { ages: '13-15 tahun', level: 'Sekolah menengah pertama', value: '96,17%', of100: 96, text: 'Dari 100 anak usia 13-15 tahun, 96 bersekolah.' },
    { ages: '16-18 tahun', level: 'Sekolah menengah atas', value: '74,64%', of100: 75, text: 'Dari 100 remaja usia 16-18 tahun, hanya 75 yang bersekolah. Sekitar 1 dari 4 remaja tidak sekolah.' },
    { ages: '19-23 tahun', level: 'Perguruan tinggi', value: '29,01%', of100: 29, text: 'Dari 100 pemuda usia 19-23 tahun, 29 kuliah.' }
  ],
  literacy2024: '96,67%',
  literacy2025: '97,10%',
  youthLiteracy: '99,79%',
  hls: '13,21 tahun',
  rls: '8,85 tahun'
};

export const HEALTH = {
  uhh2024: '74,15 tahun',
  uhh2025: '74,47 tahun',
  ipm2024: '75,02',
  ipm2025: '75,90',
  topProvince: 'DKI Jakarta, 85,05'
};

export const TRADE = {
  exports2024: 'US$ 264,70 M',
  imports2024: 'US$ 233,66 M',
  surplus2024: 'US$ 31,04 M',
  surplus2023: 'US$ 36,89 M',
  nonOilExports: 'US$ 248,83 M',
  oilGasExports: 'US$ 15,89 M',
  nonOilImports: 'US$ 197,38 M',
  oilGasImports: 'US$ 36,28 M',
  streak: '55 bulan berturut-turut sejak Mei 2020',
  exports2025: 'US$ 282,91 M',
  imports2025: 'US$ 241,86 M',
  surplus2025: 'US$ 41,05 M',
  destinations: 'Tiongkok, Amerika Serikat, Jepang',
  commodities: [
    { name: 'Batu bara', value: 'US$ 30,49 M' },
    { name: 'Minyak kelapa sawit', value: 'US$ 22,87 M' },
    { name: 'Logam dasar bukan besi', value: 'US$ 15,36 M' },
    { name: 'Besi dan baja', value: 'US$ 13,13 M' },
    { name: 'Nikel', value: 'US$ 7,99 M' }
  ]
};

export const NAV = [
  { route: '#/', label: 'Dashboard' },
  { route: '#/penduduk', label: 'Penduduk' },
  { route: '#/ekonomi', label: 'Ekonomi' },
  { route: '#/kesehatan', label: 'Kesehatan' },
  { route: '#/pendidikan', label: 'Pendidikan' },
  { route: '#/ketenagakerjaan', label: 'Ketenagakerjaan' },
  { route: '#/harga', label: 'Harga dan Inflasi' },
  { route: '#/provinsi', label: 'Provinsi' },
  { route: '#/sumber', label: 'Sumber Data' }
];

export const SOURCE_LIST = [
  { name: 'Jumlah Penduduk Pertengahan Tahun', publisher: 'BPS', year: '2025' },
  { name: 'Survei Penduduk Antar Sensus (SUPAS) 2025, BRS No. 51/05/Th. XXIX', publisher: 'BPS', year: '2026' },
  { name: 'Proyeksi Penduduk Interim 2020-2023', publisher: 'BPS', year: '2024' },
  { name: 'Sensus Penduduk 2020 (SP2020)', publisher: 'BPS', year: '2020' },
  { name: 'Pertumbuhan Ekonomi Indonesia, BRS 5 Feb 2026', publisher: 'BPS', year: '2026' },
  { name: 'Pertumbuhan Ekonomi Indonesia, BRS 5 Feb 2025', publisher: 'BPS', year: '2025' },
  { name: 'Perkembangan Indeks Harga Konsumen, BRS No. 01/01/Th. XXVIII', publisher: 'BPS', year: '2025' },
  { name: 'Keadaan Ketenagakerjaan, BRS No. 44/05/Th. XXVIII (Sakernas Feb 2025)', publisher: 'BPS', year: '2025' },
  { name: 'Profil Kemiskinan di Indonesia, Susenas Mar 2025', publisher: 'BPS', year: '2025' },
  { name: 'Statistik Pendidikan 2024 (Susenas)', publisher: 'BPS', year: '2024' },
  { name: 'Tabel Angka Melek Aksara Penduduk 15 Tahun ke Atas', publisher: 'BPS', year: '2024-2025' },
  { name: 'Statistik Pemuda Indonesia 2024', publisher: 'BPS', year: '2024' },
  { name: 'Indeks Pembangunan Manusia 2024', publisher: 'BPS', year: '2024' },
  { name: 'Indeks Pembangunan Manusia 2025, BRS 5 Nov 2025', publisher: 'BPS', year: '2025' },
  { name: 'IPM menurut Provinsi', publisher: 'BPS', year: '2025' },
  { name: 'Buletin PUSAKA, BPS Kota Jakarta Pusat', publisher: 'BPS', year: '2025' },
  { name: 'Laporan Bulanan Perdagangan, PDSI Kementerian Perdagangan', publisher: 'BPS via Kemendag', year: '2024' },
  { name: 'Peraturan Menteri Ketenagakerjaan No. 16/2024 (UMP 2025)', publisher: 'Kemenaker', year: '2024' },
  { name: 'Siaran Pers Fiskal, Kemenkeu (BKF)', publisher: 'Kemenkeu', year: '2024' }
];
