export const UPDATE_SIGN_IN_INFOS = 'UPDATE_SIGN_IN_INFOS';
export const UPDATE_REMEMBER_ME = 'UPDATE_REMEMBER_ME';

export const updateSignInInfos = (value: string, name: string) => ({
  type: UPDATE_SIGN_IN_INFOS,
  value,
  name,
});

export const updateRememberMe = (value: boolean) => ({
  type: UPDATE_REMEMBER_ME,
  value,
});
