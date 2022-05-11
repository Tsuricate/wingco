import { AvatarImage } from '../../models/players';

export const GET_AVATAR_IMAGES = 'GET_AVATAR_IMAGES';
export const SAVE_AVATAR_IMAGES = 'SAVE_AVATAR_IMAGES';
export const UPDATE_PLAYER_AVATAR = 'UDPATE_PLAYER_AVATAR';

export const getAvatarImages = () => ({
  type: GET_AVATAR_IMAGES,
});

export const saveAvatarImages = (avatarImages: Array<AvatarImage>) => ({
  type: SAVE_AVATAR_IMAGES,
  avatarImages,
});

export const updatePlayerAvatar = (newAvatarId: string) => ({
  type: UPDATE_PLAYER_AVATAR,
  newAvatarId,
});
