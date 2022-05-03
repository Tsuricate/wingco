import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { message } = req.body;

  return new Promise(async (resolve, reject) => {
    const transporter = nodemailer.createTransport({
      port: 465,
      host: 'smtp.gmail.com',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

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
