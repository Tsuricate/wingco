import Player from '../../models/players';

export const SAVE_USER = 'SAVE_USER';

export const saveUser = ({ id, name, avatar, email }: Player, rememberMe: boolean) => ({
  type: SAVE_USER,
  id,
  name,
  avatar,
  email,
  rememberMe,
});
