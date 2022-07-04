import cookie from 'cookie';
import { IncomingHttpHeaders } from 'http2';
import jwt from 'jsonwebtoken';
import { NextApiResponse } from 'next';

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

interface JWTContent {
  id: string;
  iat: number;
  exp: number;
}

export const getUserInfosFromCookie = (reqCookie: IncomingHttpHeaders['cookie']) => {
  if (!reqCookie) throw new Error('Unauthenticated user');

  const { authToken } = cookie.parse(reqCookie);
  const jwtSecret: jwt.Secret = process.env.JWT_SECRET_KEY || '';
  const payload = jwt.verify(authToken, jwtSecret) as JWTContent;

  return payload;
};
