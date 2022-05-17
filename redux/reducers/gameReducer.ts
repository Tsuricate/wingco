import { AnyAction } from 'redux';
import { InewGamePlayer } from '../../models/players';
import { ADD_PLAYER, REMOVE_PLAYER, UPDATE_PLAYER_INFOS } from '../actions/newGame';

interface gameReducerProps {
  players: Array<InewGamePlayer>;
}

const initialState: gameReducerProps = {
  players: [],
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

    default:
      return state;
  }
};

export default gameReducer;
