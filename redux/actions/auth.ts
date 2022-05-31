import { PlayerWithEmail } from '../../models/players';

export const SAVE_USER = 'SAVE_USER';
export const CHECK_TOKEN = 'CHECK_TOKEN';
export const SIGN_OUT_USER = 'SIGN_OUT_USER';
export const SAVE_PLAYER_AVATAR = 'SAVE_PLAYER_AVATAR';

export const saveUser = ({ id, name, avatar, email }: PlayerWithEmail, rememberMe: boolean) => ({
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

export const savePlayerAvatar = (newAvatar: string) => ({
  type: SAVE_PLAYER_AVATAR,
  newAvatar,
});
