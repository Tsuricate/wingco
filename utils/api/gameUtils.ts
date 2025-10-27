import client from '../../apollo-client';
import { previewClient } from '../../apollo-preview-client';
import {
  GET_ALL_GAME_IDS,
  GET_CATEGORIES,
  GET_GAMES_HISTORY,
  GET_GAME_BY_SLUG,
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

export const getGameBySlug = async (gameSlug: string, preview = false) => {
  try {
    const chosenClient = preview ? previewClient : client;

    const { data } = await chosenClient.query({
      query: GET_GAME_BY_SLUG,
      variables: { gameSlug },
      fetchPolicy: 'network-only',
    });

    if (!data || !data.game) {
      console.warn('Game not found or not accessible', gameSlug);
      return null;
    }

    return data.game;
  } catch (err) {
    console.error('GraphQL query failed:', err);
    return null;
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
