import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../apollo-client';
import { NewPlayer } from '../../models/players';
import { CREATE_PLAYER } from '../../queries/signup.queries';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const newPlayer: NewPlayer = req.body;

  try {
    const createPlayer = await client.mutate({
      mutation: CREATE_PLAYER,
      variables: { ...newPlayer, isRegistered: true },
    });

    res.status(201).json(createPlayer);
  } catch ({ message }) {
    res.status(400).json({ message });
  }
};

export default handler;
