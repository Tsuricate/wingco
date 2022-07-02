import axios from 'axios';
import Router from 'next/router';
import { AnyAction, Dispatch, Middleware } from 'redux';
import { getResultsFromPlayers, getScoresFromPlayers } from '../../utils/newGame';
import { SEND_GAME_SCORES } from '../actions/gameScores';
import { ANSWER_JOIN_REQUEST, JOIN_GAME_REQUEST } from '../actions/joinGame';
import {
  CREATE_NEW_GAME,
  DELETE_GAME,
  isCreatingNewGame,
  saveGameId,
  updateUnregisteredPlayersId,
} from '../actions/newGame';

const gameMiddleware: Middleware = (store) => (next: Dispatch) => async (action: AnyAction) => {
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

      next(action);
      break;
    }

    case ANSWER_JOIN_REQUEST: {
      const { playerId, isAccepted, gameSlug, declinedReason } = action;
      const { name } = store.getState().auth;

      axios.post('/api/pusher/answer-join-request', {
        playerId,
        isAccepted,
        gameSlug,
        hostName: name,
        declinedReason,
      });

      next(action);
      break;
    }

    default:
      next(action);
  }
};
export default gameMiddleware;
