import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../apollo-client';
import { CHANGE_PLAYER_PASSWORD } from '../../../queries/passwordAssistance.queries';
import { getHashedPassword } from '../../../utils/password';

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await getHashedPassword(password);

    const player = await client.mutate({
      mutation: CHANGE_PLAYER_PASSWORD,
      variables: { email, password: hashedPassword },
    });

    if (player.data.updatePlayer.id) {
      res.status(200).end();
    }
  } catch (err) {
    res.status(400).end();
  }
};

export default handler;
