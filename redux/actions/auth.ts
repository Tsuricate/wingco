export const UPDATE_EMAIL = 'UPDATE_EMAIL';
export const SUBMIT_SIGN_UP = 'SUBMIT_SIGN_UP';
export const SAVE_USER = 'SAVE_USER';

export const updateEmail = (email: string) => ({
  type: UPDATE_EMAIL,
  email,
});

export const submitSignUp = () => ({
  type: SUBMIT_SIGN_UP,
});

export const saveUser = (isLogged: boolean) => ({
  type: SAVE_USER,
  isLogged,
});
