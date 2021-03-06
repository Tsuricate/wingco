import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../apollo-client';
import { defaultAvatar } from '../../constants/game';
import { CREATE_PLAYER } from '../../queries/signup.queries';

import { getHashedPassword } from '../../utils/password';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await getHashedPassword(password);

    const createPlayer = await client.mutate({
      mutation: CREATE_PLAYER,
      variables: {
        name,
        email,
        password: hashedPassword,
        isRegistered: true,
        hasVerifiedEmail: false,
        avatarId: defaultAvatar.id,
      },
    });

    res.status(201).json(createPlayer.data.createPlayer);
  } catch (err) {
    res.status(400).json(err);
  }
};

export default handler;
