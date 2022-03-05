import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../apollo-client';
import { NewPlayer } from '../../models/players';
import { CREATE_PLAYER } from '../../queries/signup.queries';
import { getHashedPassword } from '../../utils/api/sign-up';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, email, password }: NewPlayer = req.body;

  try {
    const hashedPassword = await getHashedPassword(password);

    const createPlayer = await client.mutate({
      mutation: CREATE_PLAYER,
      variables: { name, email, password: hashedPassword, isRegistered: true },
    });

    res.status(201).json(createPlayer);
  } catch (err) {
    res.status(400).json(err);
  }
};

export default handler;
