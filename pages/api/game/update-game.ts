import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../apollo-client';
import { UPDATE_GAME_WITH_PLAYERS } from '../../../queries/game.queries';

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { playerChanges, gameWithNectar, activeSlug } = req.body;

  try {
    const result = await client.mutate({
      mutation: UPDATE_GAME_WITH_PLAYERS,
      variables: {
        players: playerChanges,
        withOceaniaExpansion: gameWithNectar,
        gameSlug: activeSlug,
      },
    });

    if (result.data?.updateGame) {
      return res.status(200).json({ gameInfos: result.data.updateGame });
    }

    return res.status(400).json({ message: 'Game update failed', errors: result.errors || [] });
  } catch (err: any) {
    console.error('GraphQL Error:', err.networkError?.result?.errors || err.message);
    return res.status(400).json({
      message: 'Game update failed',
      errors: err.networkError?.result?.errors || err.message,
    });
  }
};

export default handler;
