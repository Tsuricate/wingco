import { combineReducers } from 'redux';
import authReducer from './authReducer';
import signInReducer from './signInReducer';
import signUpReducer from './signUpReducer';
import passwordAssistanceReducer from './passwordAssistanceReducer';
import manageAccountReducer from './manageAccountReducer';
import playerReducer from './playerReducer';

const rootReducer = combineReducers({
  signUp: signUpReducer,
  signIn: signInReducer,
  auth: authReducer,
  passwordAssistance: passwordAssistanceReducer,
  manageAccount: manageAccountReducer,
  player: playerReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
