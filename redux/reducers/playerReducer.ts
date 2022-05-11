import { AnyAction } from 'redux';
import { AvatarImage } from '../../models/players';
import { SAVE_AVATAR_IMAGES } from '../actions/player';

interface playerReducerProps {
  avatarImages: Array<AvatarImage>;
}

const initialState: playerReducerProps = {
  avatarImages: [],
};

const playerReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SAVE_AVATAR_IMAGES: {
      return {
        ...state,
        avatarImages: action.avatarImages,
      };
    }

    default:
      return state;
  }
};

export default playerReducer;
