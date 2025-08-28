import axios from 'axios';
import { Action, Dispatch, Middleware } from 'redux';
import { defaultScores } from '../../constants/game';
import { getChangeEmailMessage } from '../../utils/api/getEmail';
import { sendEmail } from '../../utils/api/sendEmail';
import { CHECK_TOKEN, saveUser, signOutUser } from '../actions/auth';
import { hasUpdatedEmail, hasUpdatedInfos, SAVE_USER_NEW_INFOS } from '../actions/manageAccount';
import { setFirstPlayer } from '../actions/newGame';
import { SignInAction, SUBMIT_SIGN_IN, updateErrorSignIn } from '../actions/signIn';
import { RootState } from '../reducers';

const authMiddleware: Middleware<{}, RootState, Dispatch<SignInAction>> =
  (store) => (next) => (action) => {
    const typedAction = action as SignInAction;
    switch (typedAction.type) {
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
            store.dispatch(updateErrorSignIn(false));
          })
          .catch(() => {
            store.dispatch(updateErrorSignIn(true));
          });

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
