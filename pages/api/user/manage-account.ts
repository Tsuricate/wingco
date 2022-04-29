import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../apollo-client';
import { CHANGE_PLAYER_USERNAME } from '../../../queries/auth.queries';

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, username } = req.body;

  if (username) {
    try {
      const player = await client.mutate({
        mutation: CHANGE_PLAYER_USERNAME,
        variables: { id, name: username },
      });

      if (player.data.updatePlayer.id) {
        res.status(200).end();
      }
    } catch (err) {
      res.status(400).end();
    }
  }
};

export default handler;
