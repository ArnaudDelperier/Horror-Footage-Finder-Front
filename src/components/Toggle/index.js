import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// SCSS
import './toggle.scss';

// ACTIONS TO DISPATCH
import { toggleAction } from '../../actions/ui';

// COMPOSANT
// ------------ Mode d'emploi :
// Le Composant Toggle doit recevoir trois informations :
// - name : le nom du toggle qui sera stocké dans le store, sous le format : 'toggleAnimations'
// - textContent : le texte du toggle
// - onClick (facultatif) : une fonction supplémentaire qui sera appelée lors du clic sur le toggle
// Tout le reste (enregistrement dans le store, switch true/false)
// est automatiquement géré par le composant.

// ------------ Important :
// Lorsque vous créez un composant Toggle :
// - vous devez entrer son état par défaut dans le store.
// -> cela s'ajoute dans reducers/ui, au sein de l'objet 'toggles'.
// -> son nom doit être égal au name indiqué dans le composant.
export const Toggle = ({
  textContent, name, triggerToggle, currentToggle, onClick,
}) => (
  <label htmlFor={name} className={`toggle-ui ${currentToggle ? 'toggle-ui__checked' : ''}`}>
    <input
      type="checkbox"
      name={name}
      id={name}
      value={textContent}
      onClick={() => { triggerToggle(name); onClick(); }}
    />
    {textContent}
  </label>
);

Toggle.propTypes = {
  // FROM PARENT
  textContent: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  // FROM STORE
  triggerToggle: PropTypes.func.isRequired,
  currentToggle: PropTypes.bool.isRequired,
};

Toggle.defaultProps = {
  onClick: () => {},
};

const mapStateToProps = ({ ui: { toggles } }, { name }) => ({
  currentToggle: toggles[name],
});

const mapDispatchToProps = (dispatch) => ({
  triggerToggle: (toggleName) => {
    dispatch(toggleAction(toggleName));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Toggle);
