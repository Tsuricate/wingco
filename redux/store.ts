import { applyMiddleware, createStore, Middleware, Store } from 'redux';
import { createWrapper, MakeStore } from 'next-redux-wrapper';
import { composeWithDevTools } from '@redux-devtools/extension';

import rootReducer from './reducers';
import signUpMiddleware from './middlewares/signUpMiddleware';
import authMiddleware from './middlewares/authMiddleware';
import passwordAssistanceMiddleware from './middlewares/passwordAssistanceMiddleware';
import playerMiddleware from './middlewares/playerMiddleware';
import gameMiddleware from './middlewares/gameMiddleware';

const middlewares: Middleware[] = [
  signUpMiddleware,
  authMiddleware,
  passwordAssistanceMiddleware,
  playerMiddleware,
  gameMiddleware,
];

const bindMiddlewares = (middlewares: Middleware[]) => {
  if (process.env.NODE_ENV !== 'production') {
    return composeWithDevTools(applyMiddleware(...middlewares));
  }
  return applyMiddleware(...middlewares);
};

const makeStore: MakeStore<Store> = () => {
  return createStore(rootReducer, bindMiddlewares(middlewares));
};

export const wrapper = createWrapper(makeStore, {
  debug: process.env.NODE_ENV !== 'production',
});
