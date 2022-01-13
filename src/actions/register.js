// REGISTER Actions
export const CHANGE_INPUT_VALUE = 'CHANGE_INPUT_VALUE';

export const SUBMIT_FORM = 'SUBMIT_FORM';
export const TOGGLE_MASKED = 'TOGGLE_MASKED';
export const SUBMITREGISTER = 'SUBMIT_REGISTER';
export const ON_CHANGE_CONFIRMREGISTER = 'ON_CHANGE_CONFIRMREGISTER';
export const changeInputValue = (value, name) => ({
  type: CHANGE_INPUT_VALUE,
  value,
  name,
});
export const submitForm = (value) => ({
  type: SUBMIT_FORM,
  value,
});

export const toggleMasked = () => ({
  type: TOGGLE_MASKED,
});
export const onChangeConfirmRegister = () => ({
  type: ON_CHANGE_CONFIRMREGISTER,
});

// Corentin Register Actions
export const submitRegister = (pseudo, email, password) => ({
  type: SUBMITREGISTER,
  pseudo,
  email,
  password,
});
export const DELETE_INFO_IN_REDUCER = 'DELETE_INFO_IN_REDUCER';
export const deleteInfoInReducer = () => ({
  type: DELETE_INFO_IN_REDUCER,
});
