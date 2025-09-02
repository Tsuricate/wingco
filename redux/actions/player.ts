import { AvatarImage } from '../../models/players';

export type PlayerAction =
  | ReturnType<typeof getAvatarImages>
  | ReturnType<typeof saveAvatarImages>
  | ReturnType<typeof updatePlayerAvatar>
  | ReturnType<typeof updateNewPlayerAvatar>;

export const GET_AVATAR_IMAGES = 'GET_AVATAR_IMAGES' as const;
export const SAVE_AVATAR_IMAGES = 'SAVE_AVATAR_IMAGES' as const;
export const UPDATE_PLAYER_AVATAR = 'UPDATE_PLAYER_AVATAR' as const;
export const UPDATE_NEW_PLAYER_AVATAR = 'UPDATE_NEW_PLAYER_AVATAR' as const;

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

export const updateNewPlayerAvatar = (playerId: string, newAvatarId: string, newAvatarUrl: string) => ({
  type: UPDATE_NEW_PLAYER_AVATAR,
  playerId,
  newAvatarId,
  newAvatarUrl,
});
