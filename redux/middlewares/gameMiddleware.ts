import axios from 'axios';
import { Action, Dispatch, Middleware } from 'redux';
import { CREATE_NEW_GAME, DELETE_GAME, isCreatingNewGame, saveGameId } from '../actions/newGame';

const gameMiddleware: Middleware = (store) => (next: Dispatch) => async (action: Action) => {
  switch (action.type) {
    case CREATE_NEW_GAME: {
      const { players, gameWithNectar, gameSlug } = store.getState().game;
      const { id: hostId } = store.getState().auth;
      store.dispatch(isCreatingNewGame(true));

      axios.post('/api/game/create-game', { players, gameWithNectar, gameSlug, hostId }).then((res) => {
        if (res.status === 201) {
          store.dispatch(saveGameId(res.data.gameId));
          store.dispatch(isCreatingNewGame(false));
        }
      });

      next(action);
      break;
    }

    case DELETE_GAME: {
      const { gameId } = store.getState().game;
      axios.post('/api/game/delete-game', { gameId });

      next(action);
      break;
    }

    default:
      next(action);
  }
};
export default gameMiddleware;
