import {
  TOGGLE_FIELD_INPUT,
  CANCEL_SETTINGS_CHANGE,
  EDIT_PROFILE_INFORMATIONS,
  CLOSE_INPUT,
  UPDATE_TEXT_INFO,
} from '../actions/settings';
import {
  SAVE_NEW_LOGIN_STATE,
} from '../actions/login';

const initialState = {
  textInfo: '',
  pseudoInput: false,
  emailInput: false,
  passwordInput: false,
  passwordConfirmInput: false,
  newPseudo: '',
  newEmail: '',
  newPassword: '',
  newPasswordConfirm: '',
};

const SettingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FIELD_INPUT:
      return {
        ...state,
        pseudoInput: false,
        emailInput: false,
        passwordInput: false,
        passwordConfirmInput: false,
        newPseudo: '',
        newEmail: '',
        newPassword: '',
        newPasswordConfirm: '',
        [action.field]: !state.field,
      };
    case CANCEL_SETTINGS_CHANGE:
      return {
        ...state,
        pseudoInput: false,
        emailInput: false,
        passwordInput: false,
        passwordConfirmInput: false,
        newPseudo: '',
        newEmail: '',
        newPassword: '',
        newPasswordConfirm: '',
      };
    case EDIT_PROFILE_INFORMATIONS:
      if (action.value.match(/^\S+$/)) {
        return {
          ...state,
          [action.field]: action.value,
        };
      }
      return {
        ...state,
        textInfo: 'Les espaces ne sont pas autorisés',
      };
    case SAVE_NEW_LOGIN_STATE:
      return {
        ...state,
        pseudoInput: false,
        emailInput: false,
        passwordInput: false,
        passwordConfirmInput: false,
      };
    case CLOSE_INPUT:
      return {
        ...state,
        textInfo: '',
        pseudoInput: false,
        emailInput: false,
        passwordInput: false,
        passwordConfirmInput: false,
      };
    case UPDATE_TEXT_INFO:
      return {
        ...state,
        textInfo: action.value,
      };
    default:
      return state;
  }
};

export default SettingsReducer;
