import PropTypes from 'prop-types';

// Penanda memuat (judul tersembunyi untuk pembaca layar) dan pesan error yang dipakai di banyak halaman.
export function Memuat({ judul = 'Memuat halaman', teks = 'Memuat…', role }) {
  return (
    <>
      <h1 className="visually-hidden">{judul}</h1>
      <p className="notice" role={role}>{teks}</p>
    </>
  );
}

export function Galat({ pesan }) {
  if (!pesan) return null;
  return <p className="notice notice--error" role="alert">{pesan}</p>;
}

Memuat.propTypes = { judul: PropTypes.string, teks: PropTypes.string, role: PropTypes.string };
Galat.propTypes = { pesan: PropTypes.string };
