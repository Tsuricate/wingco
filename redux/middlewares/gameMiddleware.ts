import axios from 'axios';
import Router from 'next/router';
import { Dispatch, Middleware } from 'redux';
import {
  getResultsFromPlayers,
  getScoresFromPlayers,
  getUpdatedParticipants,
  sortPlayersByHost,
} from '../../utils/newGame';
import { SEND_GAME_SCORES } from '../actions/gameScores';
import { ANSWER_JOIN_REQUEST, JOIN_GAME_REQUEST, updateIsLoading } from '../actions/joinGame';
import {
  CREATE_NEW_GAME,
  DELETE_GAME,
  isCreatingNewGame,
  newGameAction,
  saveGameId,
  initializeGamePlayers,
  UPDATE_GAME,
  updateGame,
  saveCategories,
} from '../actions/newGame';
import { RootState } from '../reducers';

const gameMiddleware: Middleware<{}, RootState, Dispatch<newGameAction>> =
  (store) => (next) => async (action) => {
    const typedAction = action as newGameAction;
    switch (typedAction.type) {
      case CREATE_NEW_GAME: {
        const { players, gameWithNectar, gameSlug } = store.getState().game;
        const { id: hostId } = store.getState().auth;
        store.dispatch(isCreatingNewGame(true));

        axios
          .post('/api/game/create-game', { players, gameWithNectar, gameSlug, hostId })
          .then((res) => {
            if (res.status === 201) {
              store.dispatch(saveCategories(res.data.categories));
              store.dispatch(initializeGamePlayers(res.data.gameInfos.players));
              store.dispatch(saveGameId(res.data.gameInfos.id));
              store.dispatch(isCreatingNewGame(false));
            }
          });

        next(action);
        break;
      }

      case UPDATE_GAME: {
        const { initialPlayers, currentPlayers, activeSlug } = action as ReturnType<typeof updateGame>;
        const { gameWithNectar } = store.getState().game;
        const playerChanges = getUpdatedParticipants(initialPlayers, currentPlayers);

        axios
          .post('/api/game/update-game', { playerChanges, gameWithNectar, activeSlug })
          .then((res) => {
            if (res.status === 200) {
              const orderedGame: any = sortPlayersByHost(res.data.gameInfos);
              store.dispatch(initializeGamePlayers(orderedGame.players));
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
        const { isLogged } = store.getState().auth;
        const { gameSlug, guestPlayer } = store.getState().joinGame;
        const player = isLogged ? undefined : guestPlayer;

        store.dispatch(updateIsLoading(true));
        axios.post('/api/pusher/join-game', { gameSlug, guestPlayer: player });

        next(action);
        break;
      }

      case ANSWER_JOIN_REQUEST: {
        const { playerId, isAccepted, gameSlug, declinedReason }: any = action;
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
