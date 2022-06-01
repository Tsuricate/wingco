import axios from 'axios';

interface MessageProps {
  from: string;
  to: string;
  subject: string | undefined;
  html: string | undefined;
}

export const sendEmail = (message: MessageProps) => {
  return axios.post('/api/send-email', { message });
};
