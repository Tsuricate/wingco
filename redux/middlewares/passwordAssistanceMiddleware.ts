import axios from 'axios';
import { Action, Dispatch, Middleware } from 'redux';
import { getResetPasswordMessage } from '../../utils/api/getEmail';
import { sendEmail } from '../../utils/api/sendEmail';
import {
  CHANGE_USER_PASSWORD,
  SEND_RESET_PASSWORD_EMAIL,
  updateHasChangedPassword,
  updateHasCorrectResetCode,
  updateHasProvidedEmail,
  updateHasSubmitResetCode,
  updateIsLoading,
  VERIFY_PASSWORD_RESET_CODE,
} from '../actions/passwordAssistance';

const passwordAssistanceMiddleware: Middleware =
  (store) => (next: Dispatch) => async (action: Action) => {
    switch (action.type) {
      case SEND_RESET_PASSWORD_EMAIL:
        {
          const { email } = store.getState().passwordAssistance;
          store.dispatch(updateIsLoading(true));

          const message = await getResetPasswordMessage(email);
          if (message) {
            sendEmail(message)
              .then(() => {
                store.dispatch(updateHasProvidedEmail(true));
                store.dispatch(updateIsLoading(false));
              })
              .catch(() => {
                store.dispatch(updateHasProvidedEmail(true));
                store.dispatch(updateIsLoading(false));
              });
          }
        }
        next(action);
        break;

      case VERIFY_PASSWORD_RESET_CODE:
        {
          const { resetCode } = store.getState().passwordAssistance;
          store.dispatch(updateIsLoading(true));

          axios
            .post('/api/user/verify-reset-code', { resetCode })
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
