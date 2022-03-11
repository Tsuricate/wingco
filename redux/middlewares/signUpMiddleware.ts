import axios from 'axios';
import { Action, Dispatch, Middleware } from 'redux';
import { sendEmail } from '../../utils/api/sendEmail';
import { resetForm, SUBMIT_SIGN_UP } from '../actions/signUp';

const signUpMiddleware: Middleware = (store) => (next: Dispatch) => (action: Action) => {
  switch (action.type) {
    case SUBMIT_SIGN_UP: {
      const { username, email, password } = store.getState().signUp;
      const newPlayer = {
        name: username,
        email,
        password,
      };

      axios
        .post('/api/sign-up', newPlayer)
        .then((response) => {
          if (response.status === 201) {
            sendEmail(username, email)
              .then((response) => {
                console.log('Email sent ! ', response);
              })
              .catch((err) => {
                console.log(err);
              })
              .finally(() => {
                store.dispatch(resetForm());
              });
          }
        })
        .catch((error) => {
          console.log(error);
        });
      next(action);
      break;
    }
    default:
      next(action);
  }
};
export default signUpMiddleware;
