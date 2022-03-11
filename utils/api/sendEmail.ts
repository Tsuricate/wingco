import axios from 'axios';

export const sendEmail = (username: string, email: string) => {
  return axios.post('/api/send-email', { username, email });
};
