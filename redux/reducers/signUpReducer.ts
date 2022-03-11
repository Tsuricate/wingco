import { AnyAction } from 'redux';
import { RESET_FORM, SAVE_USER, UPDATE_SIGN_UP_INFOS } from '../actions/signUp';

interface initialStateProps {
  username: string;
  email: string;
  password: string;
  passwordValidation: string;
  isRegistered: boolean;
}

const initialState: initialStateProps = {
  username: '',
  email: '',
  password: '',
  passwordValidation: '',
  isRegistered: false,
};

const signUpReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case UPDATE_SIGN_UP_INFOS:
      return {
        ...state,
        [action.name]: action.value,
      };

    case SAVE_USER: {
      return {
        ...state,
        isRegistered: action.isRegistered,
      };
    }

    case RESET_FORM: {
      return {
        ...state,
        ...initialState,
      };
    }

    default:
      return state;
  }
};

export default signUpReducer;
