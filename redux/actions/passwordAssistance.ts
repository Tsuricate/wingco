export const UPDATE_PASSWORD_ASSISTANCE_INFOS = 'UPDATE_PASSWORD_ASSISTANCE_INFOS';
export const SEND_RESET_PASSWORD_EMAIL = 'SEND_RESET_PASSWORD_EMAIL';

export const updatePasswordAssistanceInfos = (value: string, name: string) => ({
  type: UPDATE_PASSWORD_ASSISTANCE_INFOS,
  value,
  name,
});

export const sendResetPasswordEmail = () => ({
  type: SEND_RESET_PASSWORD_EMAIL,
});
