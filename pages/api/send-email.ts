import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { getResetPasswordMessage, getSignUpMessage } from '../../utils/api/getEmail';

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId, username, email } = req.body;

  return new Promise(async (resolve, reject) => {
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
      : await getResetPasswordMessage(email);

    if (message) {
      transporter.sendMail(message, (err, info) => {
        if (err) {
          res.status(400).json(err);
          reject();
        } else {
          res.status(200).json(info);
          resolve();
        }
      });
    } else {
      res.status(200).json({});
      resolve();
    }
  });
};

export default handler;
