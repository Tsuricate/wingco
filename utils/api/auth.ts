import { NextApiResponse } from 'next';
import cookie from 'cookie';

export const deleteAuthToken = (res: NextApiResponse) => {
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('authToken', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      expires: new Date(0),
      sameSite: 'strict',
      path: '/',
    })
  );
};
