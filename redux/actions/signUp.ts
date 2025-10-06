export const UPDATE_SIGN_UP_INFOS = 'UPDATE_SIGN_UP_INFOS';
export const SUBMIT_SIGN_UP = 'SUBMIT_SIGN_UP';
export const RESEND_VALIDATION_TOKEN = 'RESEND_VALIDATION_TOKEN';
export const RESET_FORM = 'RESET_FORM';
export const RESET_ERRORS = 'RESET_ERRORS';
export const ERROR_UNIQUE_USERNAME = 'ERROR_UNIQUE_USERNAME';
export const ERROR_WHILE_CREATING_USER = 'ERROR_WHILE_CREATING_USER';
export const ERROR_WHILE_SENDING_EMAIL = 'ERROR_WHILE_SENDING_EMAIL';
export const SHOW_SIGN_UP_MODAL = 'SHOW_SIGN_UP_MODAL';
export const UPDATE_IS_LOADING = 'UPDATE_IS_LOADING';

export type SignUpAction =
  | ReturnType<typeof updateSignUpInfos>
  | ReturnType<typeof submitSignUp>
  | ReturnType<typeof resendValidationToken>
  | ReturnType<typeof resetForm>
  | ReturnType<typeof resetErrors>
  | ReturnType<typeof errorUniqueUsername>
  | ReturnType<typeof errorWhileCreatingUser>
  | ReturnType<typeof errorWhileSendingEmail>
  | ReturnType<typeof showSignUpModal>
  | ReturnType<typeof updateIsLoading>;

export const updateSignUpInfos = (value: string, name: string) => ({
  type: UPDATE_SIGN_UP_INFOS,
  value,
  name,
});

export const submitSignUp = () => ({
  type: SUBMIT_SIGN_UP,
});

export const resendValidationToken = () => ({
  type: RESEND_VALIDATION_TOKEN,
});

export const resetForm = () => ({
  type: RESET_FORM,
});

export const resetErrors = () => ({
  type: RESET_ERRORS,
});

export const errorUniqueUsername = (value: boolean) => ({
  type: ERROR_UNIQUE_USERNAME,
  value,
});

export const errorWhileCreatingUser = () => ({
  type: ERROR_WHILE_CREATING_USER,
});

export const errorWhileSendingEmail = () => ({
  type: ERROR_WHILE_SENDING_EMAIL,
});

export const showSignUpModal = (value: boolean) => ({
  type: SHOW_SIGN_UP_MODAL,
  value,
});

export const updateIsLoading = (value: boolean) => ({
  type: UPDATE_IS_LOADING,
  value,
});
