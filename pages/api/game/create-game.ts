import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../apollo-client';
import { CREATE_GAME_WITH_PLAYERS, GET_CATEGORIES } from '../../../queries/game.queries';
import { getParticipantsFromPlayers, sortPlayersByHost } from '../../../utils/newGame';

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { players, gameWithNectar, gameSlug, hostId } = req.body;

  const participants = getParticipantsFromPlayers(players);

  try {
    const newGame = await client.mutate({
      mutation: CREATE_GAME_WITH_PLAYERS,
      variables: { players: participants, gameSlug, hostId, withOceaniaExpansion: gameWithNectar },
    });

    if (newGame.data.upsertGame.id) {
      const orderedGame = sortPlayersByHost(newGame.data.upsertGame);

      const categoriesResult = await client.query({
        query: GET_CATEGORIES,
      });
      const categories = categoriesResult.data?.categories || [];

      res.status(201).json({ gameInfos: orderedGame, categories });
    }
  } catch (err: any) {
    if (err.result?.errors) {
      console.error('GRAPHQL ERRORS:', err.result.errors);
    }
    res.status(400).end();
  }
};

export default handler;
