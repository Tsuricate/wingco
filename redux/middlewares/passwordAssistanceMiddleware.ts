import axios from 'axios';
import { Action, Dispatch, Middleware } from 'redux';
import { SEND_RESET_PASSWORD_EMAIL } from '../actions/passwordAssistance';

const passwordAssistanceMiddleware: Middleware =
  (store) => (next: Dispatch) => (action: Action) => {
    switch (action.type) {
      case SEND_RESET_PASSWORD_EMAIL: {
        const { email } = store.getState().passwordAssistance;
        axios
          .post('/api/send-email', { email })
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
      }
      default:
        next(action);
    }
  };
export default passwordAssistanceMiddleware;
