// NusaData: fungsi menggambar grafik SVG.
// Semua grafik digambar kode sendiri, tanpa library. Setiap fungsi menerima
// data dan mengembalikan string SVG yang siap ditempel ke halaman.

function esc(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Grafik batang vertikal. items: [{label, value, display}]
// value dipakai untuk tinggi batang, display ditulis di atas batang.
export function barChart(items, options) {
  const opts = options || {};
  const width = opts.width || 560;
  const height = opts.height || 300;
  const barColor = opts.color || '#0e4a3f';
  const padTop = 34;
  const padBottom = 44;
  const padLeft = 16;
  const padRight = 16;
  const plotW = width - padLeft - padRight;
  const plotH = height - padTop - padBottom;
  const max = Math.max.apply(null, items.map(function (i) { return i.value; }));
  const slot = plotW / items.length;
  const barW = Math.min(64, slot * 0.58);
  let out = '<svg viewBox="0 0 ' + width + ' ' + height + '" role="img" aria-label="' + esc(opts.label || 'Grafik batang') + '">';
  out += '<line x1="' + padLeft + '" y1="' + (padTop + plotH) + '" x2="' + (width - padRight) + '" y2="' + (padTop + plotH) + '" stroke="#c9c2b2" stroke-width="1"/>';
  items.forEach(function (item, i) {
    const h = Math.max(4, (item.value / max) * plotH);
    const x = padLeft + i * slot + (slot - barW) / 2;
    const y = padTop + plotH - h;
    out += '<rect x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + barW.toFixed(1) + '" height="' + h.toFixed(1) + '" rx="3" fill="' + barColor + '"/>';
    out += '<text x="' + (x + barW / 2).toFixed(1) + '" y="' + (y - 8).toFixed(1) + '" text-anchor="middle" font-size="14" font-weight="700" fill="#1c2b28">' + esc(item.display) + '</text>';
    out += '<text x="' + (x + barW / 2).toFixed(1) + '" y="' + (padTop + plotH + 22).toFixed(1) + '" text-anchor="middle" font-size="12" fill="#4a5a55">' + esc(item.label) + '</text>';
  });
  out += '</svg>';
  return out;
}

// Grafik batang horizontal, cocok untuk nama provinsi yang panjang.
// items: [{label, value, display}]
export function hbarChart(items, options) {
  const opts = options || {};
  const width = opts.width || 560;
  const rowH = opts.rowHeight || 52;
  const barColor = opts.color || '#0e4a3f';
  const height = 16 + items.length * rowH + 8;
  const labelW = 118;
  const valueW = 84;
  const plotW = width - labelW - valueW - 12;
  const max = Math.max.apply(null, items.map(function (i) { return i.value; }));
  let out = '<svg viewBox="0 0 ' + width + ' ' + height + '" role="img" aria-label="' + esc(opts.label || 'Grafik batang horizontal') + '">';
  items.forEach(function (item, i) {
    const y = 16 + i * rowH;
    const w = Math.max(4, (item.value / max) * plotW);
    out += '<text x="0" y="' + (y + 19).toFixed(1) + '" font-size="13" fill="#1c2b28">' + esc(item.label) + '</text>';
    out += '<rect x="' + labelW + '" y="' + y.toFixed(1) + '" width="' + w.toFixed(1) + '" height="24" rx="3" fill="' + barColor + '"/>';
    out += '<text x="' + (labelW + w + 10).toFixed(1) + '" y="' + (y + 19).toFixed(1) + '" font-size="13" font-weight="700" fill="#1c2b28">' + esc(item.display) + '</text>';
  });
  out += '</svg>';
  return out;
}

// Grafik garis dengan dua titik atau lebih. points: [{label, value, display}]
export function lineChart(points, options) {
  const opts = options || {};
  const width = opts.width || 560;
  const height = opts.height || 280;
  const lineColor = opts.color || '#b4761c';
  const padTop = 36;
  const padBottom = 42;
  const padLeft = 56;
  const padRight = 30;
  const plotW = width - padLeft - padRight;
  const plotH = height - padTop - padBottom;
  const values = points.map(function (p) { return p.value; });
  let min = Math.min.apply(null, values);
  let max = Math.max.apply(null, values);
  if (max === min) { max = min + 1; min = min - 1; }
  const span = max - min;
  min = min - span * 0.25;
  max = max + span * 0.25;
  function px(i) { return padLeft + (points.length === 1 ? plotW / 2 : (i / (points.length - 1)) * plotW); }
  function py(v) { return padTop + plotH - ((v - min) / (max - min)) * plotH; }
  let out = '<svg viewBox="0 0 ' + width + ' ' + height + '" role="img" aria-label="' + esc(opts.label || 'Grafik garis') + '">';
  out += '<line x1="' + padLeft + '" y1="' + (padTop + plotH) + '" x2="' + (width - padRight) + '" y2="' + (padTop + plotH) + '" stroke="#c9c2b2" stroke-width="1"/>';
  let path = '';
  points.forEach(function (p, i) {
    path += (i === 0 ? 'M' : 'L') + px(i).toFixed(1) + ' ' + py(p.value).toFixed(1) + ' ';
  });
  out += '<path d="' + path.trim() + '" fill="none" stroke="' + lineColor + '" stroke-width="3" stroke-linecap="round"/>';
  points.forEach(function (p, i) {
    out += '<circle cx="' + px(i).toFixed(1) + '" cy="' + py(p.value).toFixed(1) + '" r="6" fill="#fffdf6" stroke="' + lineColor + '" stroke-width="3"/>';
    out += '<text x="' + px(i).toFixed(1) + '" y="' + (py(p.value) - 14).toFixed(1) + '" text-anchor="middle" font-size="15" font-weight="700" fill="#1c2b28">' + esc(p.display) + '</text>';
    out += '<text x="' + px(i).toFixed(1) + '" y="' + (padTop + plotH + 22).toFixed(1) + '" text-anchor="middle" font-size="12" fill="#4a5a55">' + esc(p.label) + '</text>';
  });
  out += '</svg>';
  return out;
}

// Bilah perbandingan 100 anak: dipakai di halaman Pendidikan untuk APS.
export function hundredBar(filled, color) {
  const total = 100;
  const cols = 25;
  const rows = 4;
  const size = 12;
  const gap = 4;
  const width = cols * (size + gap) + 4;
  const height = rows * (size + gap) + 4;
  let out = '<svg viewBox="0 0 ' + width + ' ' + height + '" role="img" aria-label="' + filled + ' dari 100 anak bersekolah">';
  for (let i = 0; i < total; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = 2 + col * (size + gap);
    const y = 2 + row * (size + gap);
    const fill = i < filled ? (color || '#0e4a3f') : '#ddd6c4';
    out += '<rect x="' + x + '" y="' + y + '" width="' + size + '" height="' + size + '" rx="2" fill="' + fill + '"/>';
  }
  out += '</svg>';
  return out;
}
