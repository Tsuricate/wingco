import { NextApiHandler } from 'next';
import nodemailer from 'nodemailer';

const handler: NextApiHandler = async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is missing.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    const info = await transporter.sendMail(message);
    return res.status(200).json(info);
  } catch (err) {
    console.error('Email sending failed:', err);
    return res.status(500).json({ error: 'Failed to send email.' });
  }
};

export default handler;
