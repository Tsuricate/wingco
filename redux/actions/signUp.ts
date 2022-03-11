export const UPDATE_SIGN_UP_INFOS = 'UPDATE_SIGN_UP_INFOS';
export const SUBMIT_SIGN_UP = 'SUBMIT_SIGN_UP';
export const RESET_FORM = 'RESET_FORM';
export const ERROR_WHILE_CREATING_USER = 'ERROR_WHILE_CREATING_USER';
export const ERROR_WHILE_SENDING_EMAIL = 'ERROR_WHILE_SENDING_EMAIL';
export const IS_SIGN_UP_PROCESS_OVER = 'IS_SIGN_UP_PROCESS_OVER';

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

export const errorWhileCreatingUser = () => ({
  type: ERROR_WHILE_CREATING_USER,
});

export const errorWhileSendingEmail = () => ({
  type: ERROR_WHILE_SENDING_EMAIL,
});

export const isSignUpProcessOver = () => ({
  type: IS_SIGN_UP_PROCESS_OVER,
});
