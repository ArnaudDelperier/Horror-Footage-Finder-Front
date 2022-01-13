/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import './modal.scss';

// Paramètres du composant "Modal"
// title et textContent > pour afficher ce que l'on souhaite
// redirect > mettre une url si on souhaite que le bouton valider redirect sinon ne rien mettre
// onConfirm et OnCancel > seront respectivement appelé au click sur valider et cancel (ils sont optionnels)
export function Modal({
  title, textContent, onConfirm, onCancel, redirect,
}) {
  return (
    <div className="modal">
      <div className="modal__wrapper">
        <h1 className="modal__title">{title}</h1>
        <p>{textContent}</p>
        {/* Pas le choix ici de nest une ternaire ici ?
        si la modal contient un redirect on render un Navlink, sinon on rendre un bouton */}
        <div className="modal__button__container">
          { onConfirm
            ? (redirect.length > 0
              ? <NavLink type="button" className="modal__button" onClick={onConfirm} to={redirect}>Valider</NavLink>
              : <button type="button" className="modal__button" onClick={onCancel}>Annuler</button>)
            : null }
          { onCancel ? <button type="button" className="modal__button" onClick={onCancel}>Annuler</button> : null}
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  textContent: PropTypes.string,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  redirect: PropTypes.string,
};

Modal.defaultProps = {
  textContent: '',
  onCancel: () => {},
  onConfirm: () => {},
  redirect: '',
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = () => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
