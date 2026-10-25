import PropTypes from 'prop-types';

// <select> dengan daftar opsi { value, label }; `kosong` menambah opsi pertama bernilai ''.
export function Select({ options, kosong, ...props }) {
  return (
    <select className="input" {...props}>
      {kosong && <option value="">{kosong}</option>}
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  );
}

// Satu kolom formulir: label + kontrol (`as`: 'input' | 'textarea' | 'select').
export default function Field({ id, label, as = 'input', ...props }) {
  const Kontrol = as === 'select' ? Select : as;
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <Kontrol id={id} className="input" {...props} />
    </div>
  );
}

const opsiType = PropTypes.arrayOf(
  PropTypes.shape({ value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, label: PropTypes.string.isRequired })
);

Select.propTypes = { options: opsiType.isRequired, kosong: PropTypes.string };

Field.propTypes = { id: PropTypes.string.isRequired, label: PropTypes.string.isRequired, as: PropTypes.string };
