export const SUBMIT_SIGN_IN = 'SUBMIT_SIGN_IN';
export const UPDATE_ERROR_SIGN_IN = 'UPDATE_ERROR_SIGN_IN';
export const UPDATE_SIGN_IN_INFOS = 'UPDATE_SIGN_IN_INFOS';
export const UPDATE_REMEMBER_ME = 'UPDATE_REMEMBER_ME';

export const submitSignIn = () => ({
  type: SUBMIT_SIGN_IN,
});

export const updateErrorSignIn = (error: boolean) => ({
  type: UPDATE_ERROR_SIGN_IN,
  error,
});

export const updateSignInInfos = (value: string, name: string) => ({
  type: UPDATE_SIGN_IN_INFOS,
  value,
  name,
});

export const updateRememberMe = (value: boolean) => ({
  type: UPDATE_REMEMBER_ME,
  value,
});
