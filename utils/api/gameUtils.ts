import client from '../../apollo-client';
import {
  GET_ALL_GAME_IDS,
  GET_CATEGORIES,
  GET_GAMES_HISTORY,
  GET_GAME_RESULTS,
} from '../../queries/game.queries';

export const getCategories = async () => {
  try {
    const {
      data: { categories },
    } = await client.query({
      query: GET_CATEGORIES,
    });
    return categories;
  } catch (err) {
    throw new Error('Cannot fetch categories');
  }
};

export const getGameResults = async (gameId: string) => {
  try {
    const {
      data: { game },
    } = await client.query({
      query: GET_GAME_RESULTS,
      variables: { gameId },
    });
    return game;
  } catch (err) {
    throw new Error('Cannot fetch game results');
  }
};

export const getAllGameIds = async () => {
  try {
    const {
      data: { games },
    } = await client.query({
      query: GET_ALL_GAME_IDS,
    });
    return games.map((game: { id: string }) => ({
      params: {
        gameId: game.id,
      },
    }));
  } catch (err) {
    throw new Error('Cannot fetch all games ids');
  }
};

export const getGamesHistory = async (playerId: string) => {
  try {
    const {
      data: {
        player: { games },
      },
    } = await client.query({
      query: GET_GAMES_HISTORY,
      variables: { playerId },
    });
    return games;
  } catch (err) {
    throw new Error('Cannot fetch games history');
  }
};
