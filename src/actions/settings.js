export const TOGGLE_FIELD_INPUT = 'TOGGLE_FIELD_INPUT';
export const toggleFieldInput = (field) => ({
  type: TOGGLE_FIELD_INPUT,
  field,
});
export const CANCEL_SETTINGS_CHANGE = 'CANCEL_SETTINGS_CHANGE';
export const cancelSettingsChange = () => ({
  type: CANCEL_SETTINGS_CHANGE,
});
export const EDIT_PROFILE_INFORMATIONS = 'EDIT_PROFILE_INFORMATIONS';
export const editProfileInformations = (value, field) => ({
  type: EDIT_PROFILE_INFORMATIONS,
  value,
  field,
});
export const SUBMIT_SETTINGS = 'SUBMIT_SETTINGS';
export const submitSettings = () => ({
  type: SUBMIT_SETTINGS,
});
export const CLOSE_INPUT = 'CLOSE_INPUT';
export const closeInput = () => ({
  type: CLOSE_INPUT,
});
export const UPDATE_TEXT_INFO = 'UPDATE_TEXT_INFO';
export const updateTextInfo = (value) => ({
  type: UPDATE_TEXT_INFO,
  value,
});
export const DELETE_ACCOUNT = 'DELETE_ACCOUNT';
export const deleteAccount = () => ({
  type: DELETE_ACCOUNT,
});
