import client from '../../apollo-client';
import { FIND_PLAYER_BY_ID } from '../../queries/auth.queries';
import { GET_AVATAR_IMAGES } from '../../queries/player.queries';
import { FIND_VERIFIED_PLAYER } from '../../queries/signin.queries';
import { FIND_PLAYER } from '../../queries/signup.queries';

export const findPlayerByEmail = async (email: string) => {
  return await client.query({
    query: FIND_PLAYER,
    variables: { email },
  });
};

export const findVerifiedPlayerByEmail = async (email: string) => {
  const response = await client.query({
    query: FIND_VERIFIED_PLAYER,
    variables: { email },
  });

  const [player] = response.data.players;

  if (player) {
    return player;
  } else {
    throw new Error('No email corresponding');
  }
};

export const findPlayerById = async (id: string) => {
  const response = await client.query({
    query: FIND_PLAYER_BY_ID,
    variables: { id },
  });

  const player = response.data.player;

  if (player) {
    return player;
  } else {
    throw new Error('No user corresponding');
  }
};

export const getAvatarImages = async () => {
  const avatarImages = await client.query({
    query: GET_AVATAR_IMAGES,
  });

  if (avatarImages) {
    return avatarImages;
  } else {
    throw new Error('Error getting avatar images');
  }
};
