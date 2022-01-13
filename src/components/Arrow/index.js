import React from 'react';
import PropTypes from 'prop-types';

import './arrow.scss';

function Arrow({ type, size }) {
  // Déclaration des variables
  let content;
  let className;

  // On détermine le type de l'arrow et on modifie son contenu et sa classe
  switch (type) {
    case 'single':
      content = '▸';
      break;

    case 'forward':
      content = '▸▸';
      className = 'arrow-ui__forward';
      break;

    case 'rewind':
      content = '◂◂';
      className = 'arrow-ui__rewind';
      break;

    default:
      content = '▸';
      break;
  }

  switch (size) {
    case 'sm':
      className += ' arrow-ui__sm';
      break;

    case 'md':
      className += ' arrow-ui__md';
      break;

    case 'lg':
      className += ' arrow-ui__lg';
      break;

    default:
      break;
  }

  return (
    <span className={`arrow-ui ${className}`}>{content}</span>
  );
}

Arrow.propTypes = {
  type: PropTypes.string,
  size: PropTypes.string,
};

Arrow.defaultProps = {
  type: 'single',
  size: 'sm',
};

export default Arrow;
