import axios from 'axios';
import { Action, Dispatch, Middleware } from 'redux';
import { saveUser } from '../actions/auth';
import { SUBMIT_SIGN_IN, updateErrorSignIn } from '../actions/signIn';

const authMiddleware: Middleware = (store) => (next: Dispatch) => (action: Action) => {
  switch (action.type) {
    case SUBMIT_SIGN_IN: {
      const { email, password, rememberMe } = store.getState().signIn;

      axios
        .post('/api/sign-in', { email, password, rememberMe })
        .then((res) => {
          store.dispatch(updateErrorSignIn(false));
          store.dispatch(saveUser(res.data.player, rememberMe));
        })
        .catch(() => {
          store.dispatch(updateErrorSignIn(true));
        });

      next(action);
      break;
    }
    default:
      next(action);
  }
};

export default authMiddleware;
