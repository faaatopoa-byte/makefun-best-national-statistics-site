// NusaData: router hash dan pengikat kontrol.
// Membaca hash di alamat, merender halaman yang cocok, lalu mengikat
// tombol tab, kotak pencarian, dan judul kolom yang bisa diurutkan.

import { PAGES, navLinks } from './views.js';

const app = document.getElementById('app');
const nav = document.getElementById('nav');

const ROUTES = {
  '': 'dashboard',
  '/': 'dashboard',
  '/penduduk': 'penduduk',
  '/ekonomi': 'ekonomi',
  '/kesehatan': 'kesehatan',
  '/pendidikan': 'pendidikan',
  '/ketenagakerjaan': 'ketenagakerjaan',
  '/harga': 'harga',
  '/provinsi': 'provinsi',
  '/sumber': 'sumber'
};

let ekonomiYear = '2025';
let hargaYear = '2024';

function currentRoute() {
  const hash = window.location.hash || '#/';
  const path = hash.slice(1);
  return ROUTES[path] || 'dashboard';
}

function bindTabs(page) {
  const buttons = app.querySelectorAll('.tabs button[data-year]');
  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (page === 'ekonomi') ekonomiYear = btn.getAttribute('data-year');
      if (page === 'harga') hargaYear = btn.getAttribute('data-year');
      render();
    });
  });
}

function sortRows(rows, key, dir) {
  const copy = rows.slice();
  copy.sort(function (x, y) {
    if (key === 'name') return dir * x.name.localeCompare(y.name, 'id');
    if (key === 'rank') return dir * (x.rank - y.rank);
    const kx = key === 'a' ? (x.aNum === undefined ? x.a : x.aNum) : (x.bNum === undefined ? x.b : x.bNum);
    const ky = key === 'a' ? (y.aNum === undefined ? y.a : y.aNum) : (y.bNum === undefined ? y.b : y.bNum);
    if (typeof kx === 'number' && typeof ky === 'number') return dir * (kx - ky);
    return dir * String(kx).localeCompare(String(ky), 'id');
  });
  return copy;
}

function paintTable(tableId, rows) {
  const table = document.getElementById(tableId);
  if (!table) return;
  const body = table.querySelector('tbody');
  const cols = table.querySelectorAll('thead th').length;
  if (rows.length === 0) {
    body.innerHTML = '<tr><td colspan="' + cols + '" class="empty">Tidak ada provinsi yang cocok.</td></tr>';
    return;
  }
  body.innerHTML = rows.map(function (r) {
    return '<tr><td>' + r.rank + '</td><td>' + r.name + '</td><td class="num">' + r.a + '</td>' + (r.b !== undefined ? '<td class="num">' + r.b + '</td>' : '') + '</tr>';
  }).join('');
}

function paintSortIndicators() {
  document.querySelectorAll('#prov-tables th.sortable').forEach(function (th) {
    const table = th.closest('table');
    const key = th.getAttribute('data-sort');
    const which = table.id === 'tbl-pop' ? sortState.pop : sortState.pdrb;
    const arrow = th.querySelector('.sort-arrow');
    if (which.key === key) {
      th.setAttribute('aria-sort', which.dir === 1 ? 'ascending' : 'descending');
      if (arrow) arrow.textContent = which.dir === 1 ? '▲' : '▼';
    } else {
      th.setAttribute('aria-sort', 'none');
      if (arrow) arrow.textContent = '';
    }
  });
}

let sortState = { pop: { key: 'rank', dir: 1 }, pdrb: { key: 'rank', dir: 1 } };

function bindProvinsi() {
  const wrap = document.getElementById('prov-tables');
  const search = document.getElementById('prov-search');
  if (!wrap || !search) return;
  const pop = JSON.parse(wrap.getAttribute('data-pop'));
  const pdrb = JSON.parse(wrap.getAttribute('data-pdrb'));
  const state = sortState;
  function apply() {
    const q = search.value.trim().toLowerCase();
    const filter = function (rows) { return rows.filter(function (r) { return r.name.toLowerCase().indexOf(q) !== -1; }); };
    paintTable('tbl-pop', sortRows(filter(pop), state.pop.key, state.pop.dir));
    paintTable('tbl-pdrb', sortRows(filter(pdrb), state.pdrb.key, state.pdrb.dir));
    paintSortIndicators();
  }
  search.addEventListener('input', apply);
  document.querySelectorAll('#prov-tables th.sortable').forEach(function (th) {
    function toggle() {
      const table = th.closest('table');
      const which = table.id === 'tbl-pop' ? state.pop : state.pdrb;
      const key = th.getAttribute('data-sort');
      if (which.key === key) which.dir = -which.dir;
      else { which.key = key; which.dir = 1; }
      apply();
    }
    th.addEventListener('click', toggle);
    th.addEventListener('keydown', function (ev) {
      if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); toggle(); }
    });
  });
  paintSortIndicators();
}

function render() {
  const page = currentRoute();
  const route = '#' + (Object.keys(ROUTES).find(function (k) { return ROUTES[k] === page; }) || '/');
  nav.innerHTML = navLinks(route);
  if (page === 'ekonomi') app.innerHTML = PAGES.ekonomi(ekonomiYear);
  else if (page === 'harga') app.innerHTML = PAGES.harga(hargaYear);
  else app.innerHTML = PAGES[page]();
  bindTabs(page);
  if (page === 'provinsi') bindProvinsi();
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', render);
render();
