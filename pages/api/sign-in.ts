import { NextApiRequest, NextApiResponse } from 'next';
import { findVerifiedPlayerByEmail } from '../../utils/api/playerUtils';
import { comparePassword } from '../../utils/password';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  try {
    const player = await findVerifiedPlayerByEmail(email);

    if (player) {
      const isPasswordValid = comparePassword(password, player.password);
      if (isPasswordValid) {
        res.status(200).json({ player });
      }
    }
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') console.log('Error : ', err);
    res.status(400).end();
  }
};

export default handler;
