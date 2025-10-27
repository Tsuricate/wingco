import { HYDRATE } from 'next-redux-wrapper';
import { AnyAction } from 'redux';
import { defaultPlayer, defaultScores } from '../../constants/game';
import { Category } from '../../models/game';
import { IGamePlayer, PlayerWithRegisteredInfos } from '../../models/players';
import { getTotalScore } from '../../utils/newGame';
import { UPDATE_PLAYER_SCORE } from '../actions/gameScores';
import {
  ADD_PLAYER,
  IS_CREATING_NEW_GAME,
  REMOVE_PLAYER,
  RESET_GAME_INFOS,
  SAVE_CATEGORIES,
  SAVE_GAME_ID,
  SAVE_GAME_SLUG,
  SET_FIRST_PLAYER,
  UPDATE_GAME_WITH_NECTAR,
  UPDATE_PLAYER_INFOS,
  UPDATE_PLAYERS_LIST,
  INITIALIZE_GAME_PLAYERS,
} from '../actions/newGame';
import { UPDATE_NEW_PLAYER_AVATAR } from '../actions/player';

export interface gameReducerProps {
  gameId: string;
  gameSlug: string;
  categories: Array<Category>;
  players: Array<IGamePlayer>;
  gameWithNectar: boolean;
  isCreatingNewGame: boolean;
}

const initialState: gameReducerProps = {
  gameId: '',
  gameSlug: '',
  categories: [],
  players: [],
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

    case SAVE_CATEGORIES: {
      return {
        ...state,
        categories: action.categories,
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

    case UPDATE_PLAYERS_LIST: {
      return {
        ...state,
        players: action.players,
      };
    }

    case INITIALIZE_GAME_PLAYERS: {
      const players = action.players.map((player: PlayerWithRegisteredInfos) => {
        if (player.isRegistered) {
          return { ...player, scores: defaultScores };
        }
        return { ...player, id: player.id, scores: defaultScores };
      });

      return {
        ...state,
        players: players,
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
          const totalScore = getTotalScore(Object.values({ ...player.scores, totalScore: 0 }));
          return {
            ...player,
            scores: {
              ...player.scores,
              [action.category]: action.value,
              totalScore,
            },
          };
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
