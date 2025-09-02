import axios from 'axios';
import { Action, Dispatch, Middleware } from 'redux';
import { getResetPasswordMessage } from '../../utils/api/getEmail';
import { sendEmail } from '../../utils/api/sendEmail';
import {
  CHANGE_USER_PASSWORD,
  passwordAssistanceAction,
  SEND_RESET_PASSWORD_EMAIL,
  updateHasChangedPassword,
  updateHasCorrectResetCode,
  updateHasProvidedEmail,
  updateHasSubmitResetCode,
  updateIsLoading,
  VERIFY_PASSWORD_RESET_CODE,
} from '../actions/passwordAssistance';
import { RootState } from '../reducers';

const passwordAssistanceMiddleware: Middleware<{}, RootState, Dispatch<passwordAssistanceAction>> =
  (store) => (next) => async (action) => {
    const typedAction = action as passwordAssistanceAction;
    switch (typedAction.type) {
      case SEND_RESET_PASSWORD_EMAIL: {
        const { email } = store.getState().passwordAssistance;
        store.dispatch(updateIsLoading(true));

        try {
          const { data: player } = await axios.post('/api/user/reset-password', {
            action: 'requestReset',
            email,
          });

          const message = await getResetPasswordMessage(email, player.name, player.passwordResetCode);

          await sendEmail(message).catch((err) => console.warn('Email not sent:', err));

          store.dispatch(updateHasProvidedEmail(true));
        } catch (err) {
          console.error('Error in SEND_RESET_PASSWORD_EMAIL:', err);
          store.dispatch(updateHasProvidedEmail(false));
        } finally {
          store.dispatch(updateIsLoading(false));
        }

        next(action);
        break;
      }

      case VERIFY_PASSWORD_RESET_CODE:
        {
          const { resetCode } = store.getState().passwordAssistance;
          store.dispatch(updateIsLoading(true));

          axios
            .post('/api/user/reset-password', { action: 'verifyReset', resetCode })
            .then(() => {
              store.dispatch(updateHasCorrectResetCode(true));
            })
            .catch(() => store.dispatch(updateHasCorrectResetCode(false)))
            .finally(() => {
              store.dispatch(updateHasSubmitResetCode(true));
              store.dispatch(updateIsLoading(false));
            });
        }
        next(action);
        break;

      case CHANGE_USER_PASSWORD: {
        const { email, password } = store.getState().passwordAssistance;

        axios
          .post('/api/user/change-password', { email, password })
          .then((res) => {
            if (res.status === 200) store.dispatch(updateHasChangedPassword());
          })
          .catch((err) => console.log(err));

        next(action);
        break;
      }
      default:
        next(action);
    }
  };
export default passwordAssistanceMiddleware;
