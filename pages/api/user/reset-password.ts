import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../apollo-client';
import {
  SET_PASSWORD_RESET_CODE,
  VERIFY_PASSWORD_RESET_CODE,
} from '../../../queries/passwordAssistance.queries';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end();

  const { action, email, resetCode } = req.body;

  switch (action) {
    case 'requestReset':
      try {
        const generatedResetCode = Math.random().toString(36).substring(2, 10).toUpperCase();

        const updatedResetCodeResponse = await client.mutate({
          mutation: SET_PASSWORD_RESET_CODE,
          variables: { email, passwordResetCode: generatedResetCode },
        });

        const updatedPlayer = updatedResetCodeResponse.data?.updatePlayer;

        if (!updatedPlayer) {
          return res.status(404).json({ error: 'Player not found' });
        }

        return res.status(200).json(updatedPlayer);
      } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to set reset code' });
      }

    case 'verifyReset':
      try {
        const player = await client.query({
          query: VERIFY_PASSWORD_RESET_CODE,
          variables: { passwordResetCode: resetCode },
        });

        if (player.data.player?.id) {
          return res.status(200).end();
        } else {
          return res.status(404).json({ error: 'Invalid reset code' });
        }
      } catch (err) {
        return res.status(400).end();
      }

    default:
      return res.status(400).end();
  }
};

export default handler;
