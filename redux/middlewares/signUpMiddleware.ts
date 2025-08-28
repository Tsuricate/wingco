import axios from 'axios';
import { Dispatch, Middleware } from 'redux';
import { sendEmail } from '../../utils/api/sendEmail';
import {
  errorWhileCreatingUser,
  errorWhileSendingEmail,
  showSignUpModal,
  resetForm,
  SUBMIT_SIGN_UP,
  updateIsLoading,
  SignUpAction,
} from '../actions/signUp';
import { RootState } from '../reducers';
import { getSignUpMessage } from '../../utils/api/getEmail';

const signUpMiddleware: Middleware<{}, RootState, Dispatch<SignUpAction>> =
  (store) => (next) => (action) => {
    const typedAction = action as SignUpAction;
    switch (typedAction.type) {
      case SUBMIT_SIGN_UP: {
        const { username, email, password } = store.getState().signUp;
        const newPlayer = { name: username, email, password };

        store.dispatch(updateIsLoading(true));

        axios
          .post('/api/sign-up', newPlayer)
          .then(async (response) => {
            if (response.status === 201) {
              const player = response.data;
              const message = getSignUpMessage(email, username, player.validationEmailToken);
              try {
                await sendEmail(message);
                store.dispatch(resetForm());
                store.dispatch(showSignUpModal(true));
              } catch {
                store.dispatch(showSignUpModal(false));
                store.dispatch(errorWhileSendingEmail());
              }
            }
          })
          .catch(() => {
            store.dispatch(showSignUpModal(false));
            store.dispatch(errorWhileCreatingUser());
          })
          .finally(() => {
            store.dispatch(updateIsLoading(false));
          });

        next(action);
        break;
      }
      default:
        next(action);
    }
  };

export default signUpMiddleware;
