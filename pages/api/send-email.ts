import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { getResetPasswordMessage, getSignUpMessage } from '../../utils/api/getEmail';

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId, username, email } = req.body;

  const transporter = nodemailer.createTransport({
    port: 465,
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  const message = userId
    ? await getSignUpMessage(userId, email, username)
    : await getResetPasswordMessage(email, username);

  transporter.sendMail(message, (err, info) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(info);
    }
  });
};

export default handler;
