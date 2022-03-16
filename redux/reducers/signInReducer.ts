import { AnyAction } from 'redux';
import { UPDATE_REMEMBER_ME, UPDATE_SIGN_IN_INFOS } from '../actions/signIn';

interface signInReducerProps {
  username: string;
  password: string;
  rememberMe: boolean;
}

const initialState: signInReducerProps = {
  username: '',
  password: '',
  rememberMe: false,
};

const signInReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case UPDATE_SIGN_IN_INFOS: {
      return {
        ...state,
        [action.name]: action.value,
      };
    }

    case UPDATE_REMEMBER_ME: {
      return {
        ...state,
        rememberMe: action.value,
      };
    }

    default:
      return state;
  }
};

export default signInReducer;
