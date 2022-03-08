import { combineReducers } from 'redux';
import authReducer from './signUpReducer';

const rootReducer = combineReducers({
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
