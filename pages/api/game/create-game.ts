import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../apollo-client';
import { CREATE_GAME } from '../../../queries/game.queries';

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Generate a slug of 6 random characters (letters and numbers)
  const gameSlug = Math.random().toString(36).substring(2, 8).toUpperCase();
  try {
    const newGame = await client.mutate({
      mutation: CREATE_GAME,
      variables: { slug: gameSlug },
    });

    if (newGame.data.createGame) {
      res.status(201).json(newGame.data.createGame);
    }
  } catch (err) {
    res.status(400).end();
  }
};

export default handler;
