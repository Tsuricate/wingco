import { AnyAction } from 'redux';
import { SAVE_USER } from '../actions/auth';

interface authReducerProps {
  id: string;
  name: string;
  avatar: string;
  email: string;
  password: string;
  rememberMe: boolean;
  isLogged: boolean;
}

const initialState: authReducerProps = {
  id: '',
  name: '',
  avatar: '',
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
        avatar: action.avatar.url,
        email: action.email,
        rememberMe: action.rememberMe,
        isLogged: true,
      };
    }
    default:
      return state;
  }
};

export default authReducer;
