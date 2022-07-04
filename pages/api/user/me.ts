import { NextApiRequest, NextApiResponse } from 'next';
import { getUserInfosFromCookie } from '../../../utils/api/auth';
import { findPlayerById } from '../../../utils/api/playerUtils';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = getUserInfosFromCookie(req.headers.cookie);

    if (id) {
      const player = await findPlayerById(id);

      if (player) res.status(200).json({ player });
    }
  } catch (error) {
    res.status(401).json(error);
  }
};

export default handler;
