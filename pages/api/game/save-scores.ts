import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../apollo-client';
import { SAVE_RESULTS } from '../../../queries/game.queries';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { gameId, scores, gameResults } = req.body;

  try {
    const { errors } = await client.mutate({
      mutation: SAVE_RESULTS,
      variables: { gameId, gameScores: scores, gameResults },
    });

    if (!errors) {
      res.status(200).end();
    }
  } catch (err) {
    console.log(err);
  }
};

export default handler;
