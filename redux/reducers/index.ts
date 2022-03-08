import { combineReducers } from 'redux';
import signUpReducer from './signUpReducer';

const rootReducer = combineReducers({
  signUp: signUpReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
