import { AnyAction } from 'redux';
import { InewGamePlayer } from '../../models/players';
import {
  ADD_PLAYER,
  REMOVE_PLAYER,
  RESET_GAME_INFOS,
  SAVE_NEW_GAME,
  UPDATE_GAME_WITH_NECTAR,
  UPDATE_HAS_STARTED_GAME,
  UPDATE_PLAYER_INFOS,
} from '../actions/newGame';
import { UPDATE_NEW_PLAYER_AVATAR } from '../actions/player';

interface gameReducerProps {
  gameId: string;
  gameSlug: string;
  players: Array<InewGamePlayer>;
  gameWithNectar: boolean;
  hasStartedGame: boolean;
}

const initialState: gameReducerProps = {
  gameId: '',
  gameSlug: '',
  players: [],
  gameWithNectar: false,
  hasStartedGame: false,
};

const gameReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ADD_PLAYER: {
      return {
        ...state,
        players: [...state.players, action.newPlayer],
      };
    }

    case REMOVE_PLAYER: {
      const newPlayersList: Array<InewGamePlayer> = action.newPlayersList;
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
          return { ...player, avatar: action.newAvatarUrl };
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
        gameSlug: action.slug,
      };
    }

    case UPDATE_HAS_STARTED_GAME: {
      return {
        ...state,
        hasStartedGame: action.value,
      };
    }

    default:
      return state;
  }
};

export default gameReducer;
