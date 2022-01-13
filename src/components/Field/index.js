import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

export default function Field({
  name, onChange, type, value,
}) {
  const handleChange = (event) => {
    onChange(event.target.value, name);
  };
  return (
    <>
      <label className="register__form__label" htmlFor={name}>
        <input type={type} value={value} id={name} className="register__form__input" name={name} placeholder={name} onChange={handleChange} />
      </label>
    </>
  );
}
Field.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
};
Field.defaultProps = {
  name: '',
  type: '',
};
