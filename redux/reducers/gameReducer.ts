import { AnyAction } from 'redux';
import uniqid from 'uniqid';
import { IGamePlayer } from '../../models/players';
import { defaultAvatar, defaultScores } from '../../utils/game';
import { UPDATE_PLAYER_SCORE } from '../actions/gameScores';
import {
  ADD_PLAYER,
  IS_CREATING_NEW_GAME,
  REMOVE_PLAYER,
  RESET_GAME_INFOS,
  SAVE_GAME_ID,
  SAVE_GAME_SLUG,
  SAVE_NEW_GAME,
  SET_FIRST_PLAYER,
  UPDATE_GAME_WITH_NECTAR,
  UPDATE_PLAYER_INFOS,
} from '../actions/newGame';
import { UPDATE_NEW_PLAYER_AVATAR } from '../actions/player';

interface gameReducerProps {
  gameId: string;
  gameSlug: string;
  players: Array<IGamePlayer>;
  gameWithNectar: boolean;
  isCreatingNewGame: boolean;
}

const initialState: gameReducerProps = {
  gameId: '',
  gameSlug: '',
  players: [
    {
      id: uniqid(),
      name: '',
      avatar: defaultAvatar,
      isRegistered: false,
      scores: defaultScores,
    },
  ],
  gameWithNectar: false,
  isCreatingNewGame: false,
};

const gameReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_FIRST_PLAYER: {
      return {
        ...state,
        players: [action.player],
      };
    }

    case ADD_PLAYER: {
      return {
        ...state,
        players: [...state.players, action.newPlayer],
      };
    }

    case REMOVE_PLAYER: {
      const newPlayersList = state.players.filter((player) => player.id !== action.playerId);
      return {
        ...state,
        players: newPlayersList,
      };
    }

    case UPDATE_PLAYER_INFOS: {
      const newArray = state.players.map((player) => {
        if (player.id === action.playerId) {
          return { ...player, name: action.value };
        }
        return player;
      });

      return {
        ...state,
        players: newArray,
      };
    }

    case UPDATE_NEW_PLAYER_AVATAR: {
      const newArray = state.players.map((player) => {
        if (player.id === action.playerId) {
          return { ...player, avatar: { id: action.newAvatarId, url: action.newAvatarUrl } };
        }
        return player;
      });

      return {
        ...state,
        players: newArray,
      };
    }

    case RESET_GAME_INFOS: {
      return {
        ...state,
        ...initialState,
      };
    }

    case UPDATE_GAME_WITH_NECTAR: {
      return {
        ...state,
        gameWithNectar: action.value,
      };
    }

    case SAVE_NEW_GAME: {
      return {
        ...state,
        gameId: action.id,
      };
    }

    case SAVE_GAME_SLUG: {
      return {
        ...state,
        gameSlug: action.slug,
      };
    }

    case SAVE_GAME_ID: {
      return {
        ...state,
        gameId: action.gameId,
      };
    }

    case IS_CREATING_NEW_GAME: {
      return {
        ...state,
        isCreatingNewGame: action.value,
      };
    }

    case UPDATE_PLAYER_SCORE: {
      const playersWithUpdatedScores = state.players.map((player) => {
        if (player.id === action.playerId) {
          return { ...player, scores: { ...player.scores, [action.category]: action.value } };
        }
        return player;
      });
      return {
        ...state,
        players: playersWithUpdatedScores,
      };
    }

    default:
      return state;
  }
};

export default gameReducer;
