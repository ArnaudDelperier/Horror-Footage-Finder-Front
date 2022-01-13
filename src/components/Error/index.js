import React from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

// SCSS
import './error.scss';

// COMPOSANTS EXTERNE
import Button from '../Button';
import MenuTitle from '../MenuTitle';

// RENDU DU COMPOSANT
// -------------- Mode d'emploi
// Le composant Error prend deux paramètres :
// - errorMessage (obligatoire) : le message d'erreur à afficher
export const Error = ({ errorMessage, goBackToHome }) => (
  <div className="error-ui menu-holder">
    <MenuTitle content={errorMessage} title="main" />
    {goBackToHome && <Button to="/" textContent="Retour à l'accueil" />}
  </div>
);

Error.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  goBackToHome: PropTypes.bool,
};

Error.defaultProps = {
  goBackToHome: false,
};

export default Error;

// Si on a besoin de Redux, on reprend ça
// const mapStateToProps = () => ({

// });

// const mapDispatchToProps = {

// };

// export default connect(mapStateToProps, mapDispatchToProps)(Error);
