import PropTypes from 'prop-types';

export default function PageHead({ judul, children }) {
  return (
    <section className="pagehead">
      <h1>{judul}</h1>
      {children && <p>{children}</p>}
    </section>
  );
}

PageHead.propTypes = { judul: PropTypes.string.isRequired, children: PropTypes.node };
