import axios from 'axios';
import { Action, Dispatch, Middleware } from 'redux';
import Router from 'next/router';
import { getResultsFromPlayers, getScoresFromPlayers } from '../../utils/newGame';
import { SEND_GAME_SCORES } from '../actions/gameScores';
import {
  CREATE_NEW_GAME,
  DELETE_GAME,
  isCreatingNewGame,
  saveGameId,
  updateUnregisteredPlayersId,
} from '../actions/newGame';
import { JOIN_GAME_REQUEST } from '../actions/joinGame';

const gameMiddleware: Middleware = (store) => (next: Dispatch) => async (action: Action) => {
  switch (action.type) {
    case CREATE_NEW_GAME: {
      const { players, gameWithNectar, gameSlug } = store.getState().game;
      const { id: hostId } = store.getState().auth;
      store.dispatch(isCreatingNewGame(true));

      axios.post('/api/game/create-game', { players, gameWithNectar, gameSlug, hostId }).then((res) => {
        if (res.status === 201) {
          store.dispatch(updateUnregisteredPlayersId(res.data.gameInfos.players));
          store.dispatch(saveGameId(res.data.gameInfos.id));
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

    case SEND_GAME_SCORES: {
      const { gameId, players } = store.getState().game;
      const scores = await getScoresFromPlayers(players);
      const gameResults = await getResultsFromPlayers(players);
      axios.post('/api/game/save-scores', { gameId, scores, gameResults }).then((res) => {
        if (res.status === 200) Router.push(`/game-results/${gameId}`);
      });

      next(action);
      break;
    }

    case JOIN_GAME_REQUEST: {
      const { gameSlug } = store.getState().joinGame;

      axios.post('/api/pusher/join-game', { gameSlug });
    }

    default:
      next(action);
  }
};
export default gameMiddleware;
