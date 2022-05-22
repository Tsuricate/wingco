import axios from 'axios';
import { Action, Dispatch, Middleware } from 'redux';
import { CREATE_NEW_GAME, saveNewGame } from '../actions/newGame';

const gameMiddleware: Middleware = (store) => (next: Dispatch) => async (action: Action) => {
  switch (action.type) {
    case CREATE_NEW_GAME:
      {
        axios.post('/api/game/create-game').then((res) => {
          const { id, slug } = res.data;
          store.dispatch(saveNewGame(id, slug));
        });
      }
      next(action);
      break;

    default:
      next(action);
  }
};
export default gameMiddleware;
