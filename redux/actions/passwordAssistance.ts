export const UPDATE_PASSWORD_ASSISTANCE_INFOS = 'UPDATE_PASSWORD_ASSISTANCE_INFOS';
export const SEND_RESET_PASSWORD_EMAIL = 'SEND_RESET_PASSWORD_EMAIL';
export const VERIFY_PASSWORD_RESET_CODE = 'VERIFY_PASSWORD_RESET_CODE';
export const UPDATE_HAS_CORRECT_RESET_CODE = 'UPDATE_HAS_CORRECT_RESET_CODE';

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

export const updateHasCorrectResetCode = (value: boolean) => ({
  type: UPDATE_HAS_CORRECT_RESET_CODE,
  value,
});
