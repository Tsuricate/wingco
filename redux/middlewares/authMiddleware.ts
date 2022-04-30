import axios from 'axios';
import { Action, Dispatch, Middleware } from 'redux';
import { CHECK_TOKEN, hasChangedUsername, saveUser, signOutUser } from '../actions/auth';
import { CHANGE_USER_USERNAME } from '../actions/manageAccount';
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

    case CHANGE_USER_USERNAME: {
      const { id, username } = store.getState().manageAccount;
      axios
        .post('/api/user/manage-account', { id, username })
        .then((res) => {
          if (res.status === 200) store.dispatch(hasChangedUsername(true));
        })
        .catch((err) => console.log(err));

      next(action);
      break;
    }

    case CHECK_TOKEN: {
      axios.get('/api/user/me').catch(() => store.dispatch(signOutUser()));
      next(action);
      break;
    }

    default:
      next(action);
  }
};

export default authMiddleware;
