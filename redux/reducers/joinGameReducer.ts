import { AnyAction } from 'redux';
import uniqid from 'uniqid';
import { defaultAvatar } from '../../constants/game';
import { Player } from '../../models/players';
import {
  ADD_PLAYER_IN_QUEUE,
  DELETE_PLAYER_IN_QUEUE,
  UPDATE_GUEST_PLAYER_INFOS,
  UPDATE_JOIN_GAME_SLUG,
} from '../actions/joinGame';
import { UPDATE_IS_LOADING } from '../actions/signUp';

interface joinGameReducerProps {
  gameSlug: string;
  playersInQueue: Array<Player>;
  guestPlayer: Player;
  isLoading: boolean;
}

const initialState: joinGameReducerProps = {
  gameSlug: '',
  playersInQueue: [],
  guestPlayer: { id: uniqid(), name: '', avatar: defaultAvatar },
  isLoading: false,
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

    case UPDATE_GUEST_PLAYER_INFOS: {
      return {
        ...state,
        guestPlayer: { ...state.guestPlayer, [action.name]: action.value },
      };
    }

    case UPDATE_IS_LOADING: {
      return {
        ...state,
        isLoading: action.value,
      };
    }

    default:
      return state;
  }
};

export default joinGameReducer;
