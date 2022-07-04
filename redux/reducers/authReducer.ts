import { AnyAction } from 'redux';
import { defaultAvatar } from '../../constants/game';
import { AvatarImage } from '../../models/players';
import { SAVE_PLAYER_AVATAR, SAVE_USER, SIGN_OUT_USER } from '../actions/auth';

interface authReducerProps {
  id: string;
  name: string;
  avatar: AvatarImage;
  email: string;
  password: string;
  rememberMe: boolean;
  isLogged: boolean;
}

const initialState: authReducerProps = {
  id: '',
  name: '',
  avatar: defaultAvatar,
  email: '',
  password: '',
  rememberMe: false,
  isLogged: false,
};

const authReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SAVE_USER: {
      return {
        ...state,
        id: action.id,
        name: action.name,
        avatar: { id: action.avatar.id, url: action.avatar.url },
        email: action.email,
        rememberMe: action.rememberMe,
        isLogged: true,
      };
    }

    case SIGN_OUT_USER: {
      return {
        ...state,
        ...initialState,
      };
    }

    case SAVE_PLAYER_AVATAR: {
      return {
        ...state,
        avatar: action.newAvatar,
      };
    }
    default:
      return state;
  }
};

export default authReducer;
