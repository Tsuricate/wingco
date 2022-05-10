import { NextApiRequest, NextApiResponse } from 'next';
import { getAvatarImages } from '../../../utils/api/playerUtils';

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const avatarImages = await getAvatarImages();

    if (avatarImages) {
      res.status(200).json({ avatarImages });
    }
  } catch (err) {
    res.status(400).end();
  }
};

export default handler;
