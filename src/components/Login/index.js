import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';

// SCSS
import './login.scss';

// IMPORTS D'ACTION/DISPATCH
import { changeInputValueLogin, login } from '../../actions/login';

// COMPOSANTS EXTERNES
import Field from '../Field';
import Button from '../Button';
import Divider from '../Divider';
import Header from '../Header';
import Footer from '../Footer';
import MenuTitle from '../MenuTitle';

// RENDU DE COMPOSANT
export function Login({
  changeField,
  onLogin,
  isLogged,
  errorMessage,
  loginEmail,
  loginPassword,
}) {
  if (isLogged) {
    // redirection sur la page d'accueil si l'utilisateur est logé
    return <Redirect to="/" />;
  }
  const onSubmit = (event) => {
    event.preventDefault();
    onLogin();
  };
  return (
    <>
      <Header />
      <div className="login__container menu-holder">
        <MenuTitle title="main" content="S'identifier" />
        <form className="login__form" onSubmit={onSubmit}>
        {/* composant contrôlé, toutes les champs ont une value qui est directement donné par le state */}
          <Field name="Email" value={loginEmail} type="email" onChange={changeField} />
          <Field name="Mot de passe" value={loginPassword} type="password" onChange={changeField} />
          {errorMessage}
          <Button className="login__validate" textContent="Valider" type="submit" />
        </form>
        <Divider />
        {/* lien pour rediriger l'utilisateur vers la pace register si ce dernier n'a pas de compte chez nous */}
        <NavLink to="/register" className="login__to-register">pas encore de compte ?</NavLink>
        <Button className="button__home" to="/" textContent="Retour à l'accueil" />
      </div>
      <Footer />
    </>
  );
}
const mapStateToProps = (state) => ({
  loginEmail: state.login.loginEmail,
  onLogin: state.login.loginPassword,
  isLogged: state.login.isLogged,
  errorMessage: state.login.errorMessage,
});

const mapDispatchToProps = (dispatch) => ({
  changeField: (value, name) => {
    const action = changeInputValueLogin(value, name);
    dispatch(action);
  },
  onLogin: () => {
    const action = login();
    dispatch(action);
  },
});

//proptypes validation
Login.propTypes = {
  changeField: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  isLogged: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  loginEmail: PropTypes.string.isRequired,
  loginPassword: PropTypes.string.isRequired,
};

Login.defaultProps = {
  errorMessage: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
