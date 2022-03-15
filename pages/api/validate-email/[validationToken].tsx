import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../apollo-client';
import { VERIFY_VALIDATION_EMAIL_TOKEN } from '../../../queries/signup.queries';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { validationToken } = req.query;

  client
    .mutate({
      mutation: VERIFY_VALIDATION_EMAIL_TOKEN,
      variables: { validationEmailToken: validationToken },
    })
    .then((response) => {
      if (response.data.updatePlayer) {
        res.status(200).redirect('/sign-in');
      } else {
        res.status(400).json('Something went wrong !');
      }
    })
    .catch((err) => {
      console.log('Error ?  : ', err);
    });
};

export default handler;
