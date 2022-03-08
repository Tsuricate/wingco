import axios from 'axios';
import { saveUser, SUBMIT_SIGN_UP } from '../actions/signUp';
import { Middleware, Dispatch, Action } from 'redux';

const signUpMiddleware: Middleware = (store) => (next: Dispatch) => (action: Action) => {
  switch (action.type) {
    case SUBMIT_SIGN_UP: {
      const { username, email, password } = store.getState().signUp;
      const newPlayer = {
        name: username,
        email,
        password,
      };

      axios
        .post('/api/sign-up', newPlayer)
        .then((response) => {
          if (response.status === 201) {
            store.dispatch(saveUser(true));
          }
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
export default signUpMiddleware;
