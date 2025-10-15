import client from '../../apollo-client';
import { NextApiRequest, NextApiResponse } from 'next';
import { FIND_PLAYER_BY_EMAIL, SET_VALIDATION_EMAIL_TOKEN } from '../../queries/signup.queries';
import uniqid from 'uniqid';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.body;

  try {
    const { data } = await client.query({
      query: FIND_PLAYER_BY_EMAIL,
      variables: { email },
    });

    if (!data || !data.player) {
      return res.status(404).json({ error: 'Player not found.' });
    }

    const validationEmailToken = uniqid();

    const updateTokenResponse = await client.mutate({
      mutation: SET_VALIDATION_EMAIL_TOKEN,
      variables: {
        id: data.player.id,
        validationEmailToken,
      },
    });

    const updatedPlayer = updateTokenResponse.data?.updatePlayer;

    if (!updatedPlayer || !updatedPlayer.validationEmailToken) {
      return res.status(500).json({ error: 'Validation token update failed.' });
    }

    return res.status(200).json(updatedPlayer);
  } catch (err: any) {
    if (err.networkError?.result?.errors) {
      console.error('errors:', err.networkError.result.errors);
    }
    return res.status(400).json({ error: 'Something went wrong during updating player token.' });
  }
};

export default handler;
