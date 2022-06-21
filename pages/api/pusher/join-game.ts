import { NextApiHandler } from 'next';
import pusher from '../../../pusher-client';
import { getUserInfosFromCookie } from '../../../utils/api/auth';
import { findPlayerById } from '../../../utils/api/playerUtils';

const handler: NextApiHandler = async (req, res) => {
  try {
    const { gameSlug, player } = req.body;

    if (!player) {
      const { id } = getUserInfosFromCookie(req.headers.cookie);
      const { name, avatar } = await findPlayerById(id);
      const registeredPlayer = {
        id,
        name,
        avatar,
      };

      await pusher.trigger(`game-${gameSlug}`, 'join-game-request', {
        player: registeredPlayer,
      });

      res.json({ message: 'Request sent !' });
    }
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') console.log('Error : ', err);
    res.status(400).end();
  }
};

export default handler;
