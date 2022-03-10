import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, email } = req.body;

  const transporter = nodemailer.createTransport({
    port: 465,
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  const message = {
    from: '"WingCo App" <wingspan.companion@gmail.com>',
    to: email,
    subject: 'Validate your email',
    html: `
      <h3> Hello ${username} </h3>
      <p>Thank you for registering into our Application. Much appreciated! Just one last step is laying ahead of you...</p>
      <p>To activate your account please follow this link: <a target="_">Validate your email</a></p>
      <p>Cheers</p>
      <p>Your Application Team</p>
    `,
  };

  transporter.sendMail(message, (err, info) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(info);
    }
  });
};

export default handler;
