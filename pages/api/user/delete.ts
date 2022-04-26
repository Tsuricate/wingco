import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import { DELETE_PLAYER_BY_ID } from '../../../queries/auth.queries';
import client from '../../../apollo-client';
import { deleteAuthToken } from '../../../utils/api/auth';

interface JWTContent {
  id: string;
  iat: number;
  exp: number;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.headers.cookie) {
    res.status(404).json({ message: 'Unauthenticated user' });
  } else {
    try {
      const { authToken } = cookie.parse(req.headers.cookie);
      const jwtSecret: jwt.Secret = process.env.JWT_SECRET_KEY || '';

      const payload = jwt.verify(authToken, jwtSecret) as JWTContent;

      if (payload.id) {
        const player = await client.mutate({
          mutation: DELETE_PLAYER_BY_ID,
          variables: { id: payload.id },
        });

        if (player) {
          deleteAuthToken(res);
          res.redirect('/?accountDeleted=true');
        }
      }
    } catch (error) {
      res.status(403).json(error);
    }
  }
};

export default handler;
