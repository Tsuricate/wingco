import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../apollo-client';
import { VERIFY_PASSWORD_RESET_CODE } from '../../../queries/passwordAssistance.queries';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { resetCode } = req.body;

  try {
    const player = await client.query({
      query: VERIFY_PASSWORD_RESET_CODE,
      variables: { passwordResetCode: resetCode },
    });

    if (player.data.player.id) {
      res.status(200).end();
    }
  } catch (err) {
    res.status(400).end();
  }
};

export default handler;
