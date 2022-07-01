import { NextApiHandler } from 'next';
import pusher from '../../../pusher-client';

const handler: NextApiHandler = async (req, res) => {
  try {
    const { playerId, isAccepted, gameSlug, hostName } = req.body;

    await pusher.trigger(`game-${gameSlug}`, `answer-join-request-player${playerId}`, {
      answerToRequest: isAccepted,
      hostName,
    });

    res.json({ message: 'Answer to invitation request sent !' });
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') console.log('Error : ', err);
    res.status(400).end();
  }
};

export default handler;
