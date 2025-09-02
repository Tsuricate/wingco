export const UPDATE_PASSWORD_ASSISTANCE_INFOS = 'UPDATE_PASSWORD_ASSISTANCE_INFOS';
export const SEND_RESET_PASSWORD_EMAIL = 'SEND_RESET_PASSWORD_EMAIL';
export const VERIFY_PASSWORD_RESET_CODE = 'VERIFY_PASSWORD_RESET_CODE';
export const UPDATE_HAS_PROVIDED_EMAIL = 'UPDATE_HAS_PROVIDED_EMAIL';
export const UPDATE_HAS_SUBMIT_RESET_CODE = 'UPDATE_HAS_SUBMIT_RESET_CODE';
export const UPDATE_HAS_CORRECT_RESET_CODE = 'UPDATE_HAS_CORRECT_RESET_CODE';
export const UPDATE_IS_LOADING = 'UPDATE_IS_LOADING';
export const CHANGE_USER_PASSWORD = 'CHANGE_USER_PASSWORD';
export const UPDATE_HAS_CHANGED_PASSWORD = 'UPDATE_HAS_CHANGED_PASSWORD';
export const RESET_PASSWORD_ASSISTANCE_INFOS = 'RESET_PASSWORD_ASSISTANCE_INFOS';

export type passwordAssistanceAction =
  | ReturnType<typeof updatePasswordAssistanceInfos>
  | ReturnType<typeof sendResetPasswordEmail>
  | ReturnType<typeof verifyPasswordResetCode>
  | ReturnType<typeof updateHasProvidedEmail>
  | ReturnType<typeof updateHasSubmitResetCode>
  | ReturnType<typeof updateHasCorrectResetCode>
  | ReturnType<typeof updateIsLoading>
  | ReturnType<typeof changeUserPassword>
  | ReturnType<typeof updateHasChangedPassword>
  | ReturnType<typeof resetPasswordAssistanceInfos>;

export const updatePasswordAssistanceInfos = (value: string, name: string) => ({
  type: UPDATE_PASSWORD_ASSISTANCE_INFOS,
  value,
  name,
});

export const sendResetPasswordEmail = () => ({
  type: SEND_RESET_PASSWORD_EMAIL,
});

export const verifyPasswordResetCode = () => ({
  type: VERIFY_PASSWORD_RESET_CODE,
});

export const updateHasProvidedEmail = (value: boolean) => ({
  type: UPDATE_HAS_PROVIDED_EMAIL,
  value,
});

export const updateHasSubmitResetCode = (value: boolean) => ({
  type: UPDATE_HAS_SUBMIT_RESET_CODE,
  value,
});

export const updateHasCorrectResetCode = (value: boolean) => ({
  type: UPDATE_HAS_CORRECT_RESET_CODE,
  value,
});

export const updateIsLoading = (value: boolean) => ({
  type: UPDATE_IS_LOADING,
  value,
});

export const changeUserPassword = () => ({
  type: CHANGE_USER_PASSWORD,
});

export const updateHasChangedPassword = () => ({
  type: UPDATE_HAS_CHANGED_PASSWORD,
});

export const resetPasswordAssistanceInfos = () => ({
  type: RESET_PASSWORD_ASSISTANCE_INFOS,
});
