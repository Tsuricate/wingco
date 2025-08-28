import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../apollo-client';
import { PUBLISH_PLAYER, VERIFY_VALIDATION_EMAIL_TOKEN } from '../../../queries/signup.queries';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { validationToken } = req.query;

  try {
    const updateResponse = await client.mutate({
      mutation: VERIFY_VALIDATION_EMAIL_TOKEN,
      variables: { validationEmailToken: validationToken },
    });

    const playerId = updateResponse.data.updatePlayer?.id;

    if (!playerId) {
      return res.status(400).redirect('/verify-email?validatedEmail=false');
    }

    await client.mutate({
      mutation: PUBLISH_PLAYER,
      variables: { id: playerId },
    });

    return res.status(200).redirect('/sign-in?validatedEmail=true');
  } catch (error) {
    console.error('Error verifying or publishing player:', error);
    return res.status(500).redirect('/verify-email?validatedEmail=false');
  }
};

export default handler;
