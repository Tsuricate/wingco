import axios from 'axios';
import { Action, Dispatch, Middleware } from 'redux';
import { getChangeEmailMessage } from '../../utils/api/getEmail';
import { sendEmail } from '../../utils/api/sendEmail';
import { defaultScores } from '../../utils/newGame';
import { CHECK_TOKEN, saveUser, signOutUser } from '../actions/auth';
import { hasUpdatedEmail, hasUpdatedInfos, SAVE_USER_NEW_INFOS } from '../actions/manageAccount';
import { setFirstPlayer } from '../actions/newGame';
import { SUBMIT_SIGN_IN, updateErrorSignIn } from '../actions/signIn';

const authMiddleware: Middleware = (store) => (next: Dispatch) => (action: Action) => {
  switch (action.type) {
    case SUBMIT_SIGN_IN: {
      const { email, password, rememberMe } = store.getState().signIn;

      axios
        .post('/api/sign-in', { email, password, rememberMe })
        .then((res) => {
          store.dispatch(saveUser(res.data.player, rememberMe));
          const { id, name, avatar } = res.data.player;
          store.dispatch(
            setFirstPlayer({ id, name, avatar, isRegistered: true, scores: defaultScores })
          );
        })
        .catch(() => {
          store.dispatch(updateErrorSignIn(true));
        })
        .finally(() => store.dispatch(updateErrorSignIn(false)));

      next(action);
      break;
    }

    case SAVE_USER_NEW_INFOS: {
      const { id, username, email } = store.getState().manageAccount;
      const { email: currentEmail } = store.getState().auth;
      axios
        .post('/api/user/manage-account', { id, username, email })
        .then(async (res) => {
          if (res.status === 200) {
            const message = await getChangeEmailMessage(id, email, username);
            if (currentEmail !== res.data.email)
              sendEmail(message).then(() => store.dispatch(hasUpdatedEmail(true)));

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
