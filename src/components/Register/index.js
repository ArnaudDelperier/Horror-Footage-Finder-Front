import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import './register.scss';

//actions
import {
  changeInputValue,
  submitForm,
  toggleMasked,
  submitRegister,
  onChangeConfirmRegister,
} from '../../actions/register';

//components
import Header from '../Header';
import Footer from '../Footer';
import Field from '../Field';
import Button from '../Button';
import Divider from '../Divider';
import MenuTitle from '../MenuTitle';


export const Register = ({
  changeField,
  registerEmail,
  registerPassword,
  registerConfirmPassword,
  registerPseudo,
  textConfirm, onSubmitForm,
  inputMasked,
  changetoggleMasked,
  onSubmitRegister,
  HandleOnChangeConfirmRegister,
  confirmationRegister,
}) => {
  //vérification des données. Amélioration possible utilisation de Joi côté front sur cette partie
  const onSubmit = (event) => {
    event.preventDefault();
    if (registerPassword !== registerConfirmPassword && registerEmail.length === 0) {
      onSubmitForm('Un email est nécessaire et la confirmation est incorrecte');
    } else if (registerPassword !== registerConfirmPassword) {
      onSubmitForm('confirmation incorrecte');
    } else if (registerEmail.length === 0) {
      onSubmitForm('Un email est nécessaire');
    } else if (registerPseudo.length > 20) {
      onSubmitForm('Votre pseudo est trop grand');
    } else {
      onSubmitRegister(registerPseudo, registerEmail, registerConfirmPassword);
      HandleOnChangeConfirmRegister();
    }
  };
  // redirection quand l'utilisateur à bien rempli et validé son formulaire d'inscription
  if (confirmationRegister) {
    return <Redirect to="/confirmation" />;
  }
  return (
    <>
      <Header />
      <div className="register__container menu-holder">
        <MenuTitle title="main" content="Creation de compte" />
        <form className="register__form" onSubmit={onSubmit}>
          <Field type="email" value={registerEmail} name="Email" onChange={changeField} />
          <Field type="text" value={registerPseudo} name="Pseudo" onChange={changeField} />
          <div className="register__form__confirmPassword__container">
            {/* ternaire pour changer le type de l'input et visualisé les caractères à la demande de l'utilisateur */}
            <Field type={inputMasked ? 'password' : 'text'} value={registerPassword} name="Mot de passe" onChange={changeField} />
            <button className="register__form__button__masked" type="button" onClick={changetoggleMasked}><div className="register__form__button__masked__eyes">👁</div></button>
          </div>
          <div className="register__form__confirmPassword__container">
            <Field type={inputMasked ? 'password' : 'text'} value={registerConfirmPassword} name="Confirmation du mot de passe" onChange={changeField} />
            <button className="register__form__button__masked" type="button" onClick={changetoggleMasked}><div className="register__form__button__masked__eyes">👁</div></button>
          </div>
          {textConfirm}
          <Button type="submit" textContent="Valider" />
        </form>
        <Divider />
        {/* lien pour rediriger vers la page de login si l'utilisateur à déjà un compte */}
        <NavLink to="/login" className="register__form__link" textContent="Un mail vous a été envoyé pour confirmer votre compte">j&apos;ai déjà un compte</NavLink>
      </div>
      <Footer />
    </>
  );
};
 //récupération d'informations du state grâce à mapStateToProps
const mapStateToProps = (state) => ({
  registerEmail: state.register.registerEmail,
  registerPassword: state.register.registerPassword,
  registerPseudo: state.register.registerPseudo,
  registerConfirmPassword: state.register.registerConfirmPassword,
  textConfirm: state.register.textConfirm,
  inputMasked: state.register.inputMasked,
  confirmationRegister: state.register.confirmationRegister,
});

//MapDispatchToProps met à disposition du composant Register des actions créators
const mapDispatchToProps = (dispatch) => ({
  changeField: (value, name) => {
    const action = changeInputValue(value, name);
    dispatch(action);
  },
  onSubmitForm: (value) => {
    const action = submitForm(value);
    dispatch(action);
  },
  changetoggleMasked: () => {
    const action = toggleMasked();
    dispatch(action);
  },
  onSubmitRegister: (pseudo, email, password) => {
    const action = submitRegister(pseudo, email, password);
    dispatch(action);
  },
  HandleOnChangeConfirmRegister: () => {
    const action = onChangeConfirmRegister();
    dispatch(action);
  },
});

//proptypes validations
Register.propTypes = {
  changeField: PropTypes.func.isRequired,
  registerPassword: PropTypes.string.isRequired,
  registerConfirmPassword: PropTypes.string.isRequired,
  textConfirm: PropTypes.string.isRequired,
  onSubmitForm: PropTypes.func.isRequired,
  registerEmail: PropTypes.string.isRequired,
  inputMasked: PropTypes.bool.isRequired,
  changetoggleMasked: PropTypes.func.isRequired,
  onSubmitRegister: PropTypes.func.isRequired,
  registerPseudo: PropTypes.string.isRequired,
  HandleOnChangeConfirmRegister: PropTypes.func.isRequired,
  confirmationRegister: PropTypes.bool.isRequired,
};
Field.defaultProps = {
  registerPassword: '',
  registerConfirmPassword: '',
  registerPseudo: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
