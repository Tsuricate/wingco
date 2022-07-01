import { AnyAction } from 'redux';
import { Player } from '../../models/players';
import { ADD_PLAYER_IN_QUEUE, DELETE_PLAYER_IN_QUEUE, UPDATE_JOIN_GAME_SLUG } from '../actions/joinGame';

interface joinGameReducerProps {
  gameSlug: string;
  playersInQueue: Array<Player>;
}

const initialState: joinGameReducerProps = {
  gameSlug: '',
  playersInQueue: [],
};

const joinGameReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case UPDATE_JOIN_GAME_SLUG: {
      return {
        ...state,
        [action.name]: action.value,
      };
    }

    case ADD_PLAYER_IN_QUEUE: {
      return {
        ...state,
        playersInQueue: [...state.playersInQueue, { ...action.player }],
      };
    }

    case DELETE_PLAYER_IN_QUEUE: {
      const newPlayerList = state.playersInQueue.filter((player) => player.id !== action.playerId);
      return {
        ...state,
        playersInQueue: newPlayerList,
      };
    }
    default:
      return state;
  }
};

export default joinGameReducer;
