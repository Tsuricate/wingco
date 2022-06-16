import client from '../../apollo-client';
import { ResultScore } from '../../models/game';
import { BestPersonalScores } from '../../models/statistics';
import { FIND_PLAYER_BY_ID } from '../../queries/auth.queries';
import { GET_AVATAR_IMAGES, GET_PLAYER_STATISTICS } from '../../queries/player.queries';
import { FIND_VERIFIED_PLAYER } from '../../queries/signin.queries';
import { FIND_PLAYER } from '../../queries/signup.queries';
import { getCategoriesFromScores } from '../gameResults';

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

export const getPlayerStatistics = async (playerId: string) => {
  try {
    const {
      data: { player },
    } = await client.query({
      query: GET_PLAYER_STATISTICS,
      variables: { playerId },
    });
    return player;
  } catch (err) {
    throw new Error('Cannont fetch player statistics');
  }
};

export const getBestScoresByCategory = (gameScores: Array<ResultScore>): Array<BestPersonalScores> => {
  const categories = getCategoriesFromScores(gameScores);

  const bestScoreByCategory = categories.map((category) => {
    const previousScoresInCurrentCategory = gameScores
      .filter((score) => score.category.name === category)
      .map((score) => score.value);

    const bestScore = Math.max(...previousScoresInCurrentCategory);

    return {
      category,
      value: bestScore,
    };
  });

  return bestScoreByCategory;
};
