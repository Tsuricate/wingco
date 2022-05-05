import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../apollo-client';
import { UPDATE_PLAYER_INFOS } from '../../../queries/auth.queries';

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, username, email } = req.body;

  if (username) {
    try {
      const player = await client.mutate({
        mutation: UPDATE_PLAYER_INFOS,
        variables: { id, name: username, email },
      });

      if (player.data.updatePlayer.id) {
        res.status(200).json(player.data.updatePlayer);
      }
    } catch (err) {
      res.status(400).end();
    }
  }
};

export default handler;
