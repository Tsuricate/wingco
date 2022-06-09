import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../apollo-client';
import { SAVE_RESULTS } from '../../../queries/game.queries';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { gameId, scores } = req.body;

  try {
    const saveResults = await client.mutate({
      mutation: SAVE_RESULTS,
      variables: { gameId, gameScores: scores },
    });

    console.log('saveResults : ', saveResults, res.status);
  } catch (err) {
    console.log(err);
  }
};

export default handler;
