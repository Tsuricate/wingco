export const UPDATE_SIGN_UP_INFOS = 'UPDATE_SIGN_UP_INFOS';
export const SUBMIT_SIGN_UP = 'SUBMIT_SIGN_UP';
export const RESET_FORM = 'RESET_FORM';
export const RESET_ERRORS = 'RESET_ERRORS';
export const ERROR_WHILE_CREATING_USER = 'ERROR_WHILE_CREATING_USER';
export const ERROR_WHILE_SENDING_EMAIL = 'ERROR_WHILE_SENDING_EMAIL';
export const SHOW_SIGN_UP_MODAL = 'SHOW_SIGN_UP_MODAL';

export const updateSignUpInfos = (value: string, name: string) => ({
  type: UPDATE_SIGN_UP_INFOS,
  value,
  name,
});

export const submitSignUp = () => ({
  type: SUBMIT_SIGN_UP,
});

export const resetForm = () => ({
  type: RESET_FORM,
});

export const resetErrors = () => ({
  type: RESET_ERRORS,
});

export const errorWhileCreatingUser = () => ({
  type: ERROR_WHILE_CREATING_USER,
});

export const errorWhileSendingEmail = () => ({
  type: ERROR_WHILE_SENDING_EMAIL,
});

export const showSignUpModal = () => ({
  type: SHOW_SIGN_UP_MODAL,
});
