import { combineReducers } from 'redux';
import authReducer from './authReducer';
import signInReducer from './signInReducer';
import signUpReducer from './signUpReducer';
import passwordAssistanceReducer from './passwordAssistanceReducer';

const rootReducer = combineReducers({
  signUp: signUpReducer,
  signIn: signInReducer,
  auth: authReducer,
  passwordAssistance: passwordAssistanceReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
