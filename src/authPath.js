// Alamat berbasis path (/auth/login, /auth/register) dipetakan ke rute HashRouter.
const PETA = { '/auth/login': '#/masuk', '/auth/register': '#/daftar' };

// Membuang garis miring di akhir path. Memakai perulangan (bukan regex) agar waktunya selalu linear.
function tanpaGarisMiringAkhir(teks) {
  let akhir = teks.length;
  while (akhir > 0 && teks[akhir - 1] === '/') akhir--;
  return teks.slice(0, akhir);
}

// Mengembalikan hash tujuan jika path cocok dan hash belum menunjuk rute; selain itu null.
export function hashUntukPath(pathname, hash) {
  const path = tanpaGarisMiringAkhir(String(pathname || ''));
  if (!PETA[path]) return null;
  if (String(hash || '').startsWith('#/')) return null;
  return PETA[path];
}
