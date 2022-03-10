import axios from 'axios';

export const sendEmail = (username: string, email: string) => {
  axios
    .post('/api/send-email', { username, email })
    .then((response) => {
      console.log('Email sent ! ', response);
    })
    .catch((err) => {
      console.log(err);
    });
};
