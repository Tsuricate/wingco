import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../apollo-client';
import { CHANGE_PLAYER_AVATAR } from '../../../queries/player.queries';

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, newAvatarId } = req.body;
  try {
    const player = await client.mutate({
      mutation: CHANGE_PLAYER_AVATAR,
      variables: { playerId: id, avatarId: newAvatarId },
    });
    if (player.data.updatePlayer.avatar) {
      res.status(200).json(player.data.updatePlayer.avatar);
    }
  } catch (err) {
    res.status(400).end();
  }
};

export default handler;
