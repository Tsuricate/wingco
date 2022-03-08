import axios from 'axios';
import { saveUser, SUBMIT_SIGN_UP } from '../actions/auth';
import { Middleware, Dispatch, Action } from 'redux';

const authMiddleware: Middleware = (store) => (next: Dispatch) => (action: Action) => {
  switch (action.type) {
    case SUBMIT_SIGN_UP: {
      const newPlayer = store.getState().auth;

      axios
        .post('/api/sign-up', newPlayer)
        .then((response) => {
          console.log('response sign-up : ', response);
          store.dispatch(saveUser(true));
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          //
        });

      next(action);
      break;
    }
    default:
      next(action);
  }
};
export default authMiddleware;
