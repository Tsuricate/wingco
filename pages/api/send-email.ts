import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import client from '../../apollo-client';
import nodemailer from 'nodemailer';
import uniqid from 'uniqid';
import { SET_VALIDATION_EMAIL_TOKEN } from '../../queries/signup.queries';

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

  const validationEmailToken = uniqid();

  const setValidationEmailToken = await client.mutate({
    mutation: SET_VALIDATION_EMAIL_TOKEN,
    variables: { id: userId, validationEmailToken: validationEmailToken },
  });

  const validationToken = setValidationEmailToken.data.updatePlayer.validationEmailToken;

  const message = {
    from: '"WingCo App" <wingspan.companion@gmail.com>',
    to: email,
    subject: 'Validate your email',
    html: `
      <h3> Hello ${username} </h3>
      <p>Thank you for registering into our Application. Much appreciated! Just one last step is laying ahead of you...</p>
      <p>To activate your account please follow this link: <a target="_blank" href="${process.env.WEB_URI}/api/validate-email/${validationToken}">Validate your email</a></p>
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
