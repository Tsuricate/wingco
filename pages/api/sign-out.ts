import { NextApiRequest, NextApiResponse } from 'next';
import { deleteAuthToken } from '../../utils/api/auth';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  deleteAuthToken(res);
  res.redirect('/');
};

export default handler;
