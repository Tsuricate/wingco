import { AnyAction } from 'redux';
import { NewGamePlayer } from '../../models/players';
import { SAVE_FIRST_PLAYER } from '../actions/newGame';

interface gameReducerProps {
  players: Array<NewGamePlayer>;
}

const initialState: gameReducerProps = {
  players: [],
};

const gameReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SAVE_FIRST_PLAYER: {
      return {
        ...state,
        players: [...state.players, action.newPlayer],
      };
    }

    default:
      return state;
  }
};

export default gameReducer;
