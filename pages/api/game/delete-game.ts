import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../apollo-client';
import { DELETE_GAME } from '../../../queries/game.queries';

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Generate a slug of 6 random characters (letters and numbers)
  const { gameId } = req.body;
  try {
    const deletedGame = await client.mutate({
      mutation: DELETE_GAME,
      variables: { id: gameId },
    });

    if (deletedGame.data) {
      res.status(200).end();
    }
  } catch (err) {
    res.status(400).end();
  }
};

export default handler;
