import axios from 'axios';
import { Action, Dispatch, Middleware } from 'redux';
import { getSignUpMessage } from '../../utils/api/getEmail';
import { sendEmail } from '../../utils/api/sendEmail';
import {
  errorWhileCreatingUser,
  errorWhileSendingEmail,
  showSignUpModal,
  resetForm,
  SUBMIT_SIGN_UP,
} from '../actions/signUp';

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
        .then(async (response) => {
          if (response.status === 201) {
            const userId = response.data.id;
            const message = await getSignUpMessage(userId, email, username);

            sendEmail(message)
              .catch(() => {
                store.dispatch(errorWhileSendingEmail());
              })
              .finally(() => {
                store.dispatch(resetForm());
              });
          }
        })
        .catch(() => {
          store.dispatch(errorWhileCreatingUser());
        })
        .finally(() => {
          store.dispatch(showSignUpModal());
        });

      next(action);
      break;
    }
    default:
      next(action);
  }
};
export default signUpMiddleware;
