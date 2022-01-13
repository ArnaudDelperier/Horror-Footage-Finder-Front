import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import './button.scss';

// Le composant Button réutilisable peut prendre les paramètres suivants :
// - textContent (string, obligatoire) : le texte à afficher dans le bouton
// - onClick (func, facultatif) : fonction appelée lorsque l'on clique sur le bouton
// - to (string, facultatif) : l'URL vers laquelle on souhaite rediriger
// lorsque l'on clique sur le bouton. Si présent, le bouton est transformé
// en NavLink/react-router-dom
// - className (string, facultatif) : le nom de la(les) classe(s) CSS à appliquer au bouton
// - type (string, facultatif) : le type de bouton à afficher (ex: 'submit').
// Par défaut, type='button'.
// - value (string, facultatif) : la valeur du bouton (ex: 'mockumentary').
export function Button({
  textContent, onClick, to, className, type, value, selected,
  toggleAnimations,
}) {
  return (
    <button
      className={`button-ui ${className} ${selected && 'button-ui__selected'} ${toggleAnimations && 'button-ui__animated'}`}
      onClick={onClick}
      // eslint-disable-next-line react/button-has-type
      type={type || 'button'}
      value={value}
      selected={selected}
    >
      {to ? <NavLink to={to}>{textContent}</NavLink> : <div className="button-ui__content">{textContent}</div> }
    </button>
  );
}

Button.propTypes = {
  // FROM PARENT
  textContent: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  to: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  selected: PropTypes.bool,
  // FROM STORE
  toggleAnimations: PropTypes.bool.isRequired,
};

Button.defaultProps = {
  onClick: () => {},
  to: null,
  className: '',
  type: 'button',
  value: null,
  selected: false,
};

const mapStateToProps = ({ ui: { toggles: { toggleAnimations } } }) => ({
  toggleAnimations,
});

const mapDispatchToProps = () => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Button);
