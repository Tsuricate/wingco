import axios from 'axios';
import { Dispatch, Middleware } from 'redux';
import { sendEmail } from '../../utils/api/sendEmail';
import {
  errorUniqueUsername,
  errorWhileCreatingUser,
  errorWhileSendingEmail,
  showSignUpModal,
  SUBMIT_SIGN_UP,
  updateIsLoading,
  SignUpAction,
  RESEND_VALIDATION_TOKEN,
} from '../actions/signUp';
import { RootState } from '../reducers';
import { getSignUpMessage } from '../../utils/api/getEmail';

const signUpMiddleware: Middleware<{}, RootState, Dispatch<SignUpAction>> =
  (store) => (next) => (action) => {
    const handleEmailSend = async (apiEndpoint: string, payload: any) => {
      store.dispatch(updateIsLoading(true));
      try {
        const response = await axios.post(apiEndpoint, payload);

        if (response.status === 200 || response.status === 201) {
          const player = response.data;
          const { email, username } = store.getState().signUp;
          const message = getSignUpMessage(email, username, player.validationEmailToken);
          try {
            await sendEmail(message);
            store.dispatch(showSignUpModal(true));
          } catch {
            store.dispatch(showSignUpModal(false));
            store.dispatch(errorWhileSendingEmail());
          }
        }
      } catch (error: any) {
        store.dispatch(showSignUpModal(false));
        if (error.response?.status === 409 && error.response.data.field === 'username') {
          store.dispatch(errorUniqueUsername(true));
        } else {
          store.dispatch(errorWhileCreatingUser());
        }
      } finally {
        store.dispatch(updateIsLoading(false));
      }
    };

    const typedAction = action as SignUpAction;
    switch (typedAction.type) {
      case SUBMIT_SIGN_UP: {
        const { username, email, password } = store.getState().signUp;
        handleEmailSend('/api/sign-up', { name: username, email, password });
        break;
      }
      case RESEND_VALIDATION_TOKEN: {
        const { email } = store.getState().signUp;
        handleEmailSend('/api/resend-email', { email });
        break;
      }
      default:
        next(action);
    }
  };

export default signUpMiddleware;
