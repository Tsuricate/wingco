import axios from 'axios';

export const sendEmail = (userId: string, username: string, email: string) => {
  return axios.post('/api/send-email', { userId, username, email });
};
