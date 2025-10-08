import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import * as cookie from 'cookie';
import { findVerifiedPlayerByEmail } from '../../utils/api/playerUtils';
import { comparePassword } from '../../utils/password';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password, rememberMe } = req.body;

  try {
    const player = await findVerifiedPlayerByEmail(email);

    if (player) {
      const isPasswordValid = comparePassword(password, player.password);
      if (isPasswordValid) {
        const payload = {
          id: player.id,
        };

        // expiration time set to 1 month if rememberMe was checked, 4 hours otherwise.
        const expirationTime = rememberMe ? 60 * 60 * 24 * 7 : 60 * 60 * 2;
        const jwtSecret: jwt.Secret = process.env.JWT_SECRET_KEY || '';

        const token = jwt.sign(payload, jwtSecret, {
          expiresIn: expirationTime,
        });

        res.setHeader(
          'Set-Cookie',
          cookie.serialize('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 60 * 60 * 24 * 7,
            sameSite: 'strict',
            path: '/',
          })
        );

        res.status(200).json({ success: true, player });
      }
    }
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') console.log('Error : ', err);
    res.status(400).end();
  }
};

export default handler;
