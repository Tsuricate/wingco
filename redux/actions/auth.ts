import Player from '../../models/players';

export const SAVE_USER = 'SAVE_USER';
export const CHECK_TOKEN = 'CHECK_TOKEN';
export const SIGN_OUT_USER = 'SIGN_OUT_USER';
export const HAS_CHANGED_USERNAME = 'HAS_CHANGED_USERNAME';

export const saveUser = ({ id, name, avatar, email }: Player, rememberMe: boolean) => ({
  type: SAVE_USER,
  id,
  name,
  avatar,
  email,
  rememberMe,
});

export const checkToken = () => ({
  type: CHECK_TOKEN,
});

export const signOutUser = () => ({
  type: SIGN_OUT_USER,
});

export const hasChangedUsername = (value: boolean) => ({
  type: HAS_CHANGED_USERNAME,
  value,
});
