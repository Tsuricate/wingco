import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import { findVerifiedPlayerByEmail } from '../../utils/api/playerUtils';
import { comparePassword } from '../../utils/password';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  try {
    const player = await findVerifiedPlayerByEmail(email);

    if (player) {
      const isPasswordValid = comparePassword(password, player.password);
      if (isPasswordValid) {
        const payload = {
          id: player.id,
        };
        const jwtSecret: jwt.Secret = process.env.JWT_SECRET_KEY || '';
        const token = jwt.sign(payload, jwtSecret, {
          expiresIn: 60 * 60 * 24 * 7,
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
