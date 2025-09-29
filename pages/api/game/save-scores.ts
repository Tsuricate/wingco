import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../apollo-client';
import { SAVE_RESULTS } from '../../../queries/game.queries';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { gameId, scores, gameResults } = req.body;

  try {
    const result = await client.mutate({
      mutation: SAVE_RESULTS,
      variables: { gameId, gameScores: scores, gameResults },
    });

    if (result.errors?.length) {
      console.error('💥 GraphQL Errors:', result.errors);
      return res.status(400).json({ errors: result.errors });
    }

    return res.status(200).json({ success: true });
  } catch (err: any) {
    if (err.networkError?.result?.errors) {
      console.error('GraphQL Errors:', err.networkError.result.errors);
    }

    res.status(400).json({
      message: 'Save results mutation failed',
      errors: err.networkError?.result?.errors || err.message,
    });
  }
};

export default handler;
