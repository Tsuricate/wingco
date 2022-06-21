import { AnyAction } from 'redux';
import { UPDATE_JOIN_GAME_SLUG } from '../actions/joinGame';

interface joinGameReducerProps {
  gameSlug: string;
}

const initialState: joinGameReducerProps = {
  gameSlug: '',
};

const joinGameReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case UPDATE_JOIN_GAME_SLUG: {
      return {
        ...state,
        [action.name]: action.value,
      };
    }
    default:
      return state;
  }
};

export default joinGameReducer;
