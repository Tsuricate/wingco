import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import client from '../../apollo-client';
import nodemailer from 'nodemailer';
import uniqid from 'uniqid';
import { SET_VALIDATION_EMAIL_TOKEN } from '../../queries/signup.queries';
import { i18n } from 'next-i18next';

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
    html: i18n?.t('email:signUpEmail', { username, domain: process.env.WEB_URI, validationToken }),
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
