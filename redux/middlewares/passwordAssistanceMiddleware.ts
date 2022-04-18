import axios from 'axios';
import { Action, Dispatch, Middleware } from 'redux';
import {
  SEND_RESET_PASSWORD_EMAIL,
  updateHasCorrectResetCode,
  updateHasSubmitResetCode,
  updateIsLoading,
  VERIFY_PASSWORD_RESET_CODE,
} from '../actions/passwordAssistance';

const passwordAssistanceMiddleware: Middleware =
  (store) => (next: Dispatch) => (action: Action) => {
    switch (action.type) {
      case SEND_RESET_PASSWORD_EMAIL:
        {
          const { email } = store.getState().passwordAssistance;
          store.dispatch(updateIsLoading(true));
          axios
            .post('/api/send-email', { email })
            .then(() => store.dispatch(updateHasSubmitResetCode(false)))
            .finally(() => store.dispatch(updateIsLoading(false)));
        }
        next(action);
        break;

      case VERIFY_PASSWORD_RESET_CODE:
        {
          const { resetCode } = store.getState().passwordAssistance;
          axios
            .post('/api/user/verify-reset-code', { resetCode })
            .then(() => {
              store.dispatch(updateHasCorrectResetCode(true));
            })
            .catch(() => store.dispatch(updateHasCorrectResetCode(false)))
            .finally(() => store.dispatch(updateHasSubmitResetCode(true)));
        }
        next(action);
        break;

      default:
        next(action);
    }
  };
export default passwordAssistanceMiddleware;
