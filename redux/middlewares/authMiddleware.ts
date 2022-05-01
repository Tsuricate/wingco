import axios from 'axios';
import { Action, Dispatch, Middleware } from 'redux';
import { CHECK_TOKEN, saveUser, signOutUser } from '../actions/auth';
import { hasUpdatedInfos, SAVE_USER_NEW_INFOS } from '../actions/manageAccount';
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

    case SAVE_USER_NEW_INFOS: {
      const { id, username, email } = store.getState().manageAccount;
      axios
        .post('/api/user/manage-account', { id, username, email })
        .then((res) => {
          if (res.status === 200) {
            console.log(res);
            store.dispatch(hasUpdatedInfos(true));
          }
        })
        .catch((err) => console.log(err))
        .finally(() => store.dispatch(hasUpdatedInfos(false)));

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
