import {
  CHANGE_INPUT_VALUE,
  SUBMIT_FORM,
  TOGGLE_MASKED,
  ON_CHANGE_CONFIRMREGISTER,
  DELETE_INFO_IN_REDUCER,
} from '../actions/register';

const initialState = {
  registerEmail: '',
  registerPassword: '',
  registerConfirmPassword: '',
  registerPseudo: '',
  textConfirm: '',
  inputMasked: true,
  confirmationRegister: false,
};

function registerReducer(state = initialState, { type, name, value }) {
  switch (type) {
    case TOGGLE_MASKED:
      return {
        ...state,
        inputMasked: !state.inputMasked,
      };
    case ON_CHANGE_CONFIRMREGISTER:
      return {
        ...state,
        confirmationRegister: true,
      };
    case CHANGE_INPUT_VALUE: {
      if (name === 'Email') {
        return {
          ...state,
          registerEmail: value,
        };
      }
      if (name === 'Mot de passe') {
        return {
          ...state,
          registerPassword: value,
        };
      }
      if (name === 'Confirmation du mot de passe') {
        return {
          ...state,
          registerConfirmPassword: value,
        };
      }
      if (name === 'Pseudo') {
        return {
          ...state,
          registerPseudo: value,
        };
      }
      return state;
    }
    case DELETE_INFO_IN_REDUCER:
      return {
        ...initialState,
      };
    case SUBMIT_FORM:
      return {
        ...state,
        textConfirm: value,
      };
    default:
      return state;
  }
}
export default registerReducer;
