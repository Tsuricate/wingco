import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import { findPlayerById } from '../../../utils/api/playerUtils';

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
        const player = await findPlayerById(payload.id);

        if (player) res.status(200).json({ player });
      }
    } catch (error) {
      res.status(403).json(error);
    }
  }
};

export default handler;
