import { combineReducers } from 'redux';
import signInReducer from './signInReducer';
import signUpReducer from './signUpReducer';

const rootReducer = combineReducers({
  signUp: signUpReducer,
  signIn: signInReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
