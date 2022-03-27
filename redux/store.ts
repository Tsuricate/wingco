import { applyMiddleware, createStore, Middleware } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';
import signUpMiddleware from './middlewares/signUpMiddleware';
import authMiddleware from './middlewares/authMiddleware';

const middlewares = [signUpMiddleware, authMiddleware];

const bindMiddlewares = (middlewares: Array<Middleware>) => {
  if (process.env.NODE_ENV !== 'production') {
    return composeWithDevTools(applyMiddleware(...middlewares));
  }
  return applyMiddleware(...middlewares);
};

const makeStore = () => createStore(rootReducer, bindMiddlewares(middlewares));

export const wrapper = createWrapper(makeStore, { debug: true });
