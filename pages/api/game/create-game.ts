import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../apollo-client';
import { CREATE_GAME_WITH_PLAYERS } from '../../../queries/game.queries';
import { getParticipantsFromPlayers } from '../../../utils/newGame';

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { players, gameWithNectar, gameSlug, hostId } = req.body;

  const participants = getParticipantsFromPlayers(players);

  try {
    const newGame = await client.mutate({
      mutation: CREATE_GAME_WITH_PLAYERS,
      variables: { players: participants, gameSlug, hostId, withOceaniaExpansion: gameWithNectar },
    });

    if (newGame.data.upsertGame.id) {
      res.status(201).json({ gameInfos: newGame.data.upsertGame });
    }
  } catch (err: any) {
    if (err.result?.errors) {
      console.error('GRAPHQL ERRORS:', err.result.errors);
    }
    res.status(400).end();
  }
};

export default handler;
