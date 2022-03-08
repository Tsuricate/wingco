export const UPDATE_SIGN_UP_INFOS = 'UPDATE_SIGN_UP_INFOS';
export const SUBMIT_SIGN_UP = 'SUBMIT_SIGN_UP';
export const SAVE_USER = 'SAVE_USER';

export const updateSignUpInfos = (value: string, name: string) => ({
  type: UPDATE_SIGN_UP_INFOS,
  value,
  name,
});

export const submitSignUp = () => ({
  type: SUBMIT_SIGN_UP,
});

export const saveUser = (isRegistered: boolean) => ({
  type: SAVE_USER,
  isRegistered,
});
