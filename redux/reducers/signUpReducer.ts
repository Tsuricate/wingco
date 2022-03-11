import { AnyAction } from 'redux';
import {
  ERROR_WHILE_CREATING_USER,
  ERROR_WHILE_SENDING_EMAIL,
  IS_SIGN_UP_PROCESS_OVER,
  RESET_FORM,
  UPDATE_SIGN_UP_INFOS,
} from '../actions/signUp';

interface initialStateProps {
  username: string;
  email: string;
  password: string;
  passwordValidation: string;
  isSignUpProcessOver: boolean;
  errorWhileCreatingUser: boolean;
  errorWhileSendingEmail: boolean;
  isRegistered: boolean;
}

const initialState: initialStateProps = {
  username: '',
  email: '',
  password: '',
  passwordValidation: '',
  isSignUpProcessOver: false,
  errorWhileCreatingUser: false,
  errorWhileSendingEmail: false,
  isRegistered: false,
};

const signUpReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case UPDATE_SIGN_UP_INFOS:
      return {
        ...state,
        [action.name]: action.value,
      };

    case RESET_FORM: {
      return {
        ...state,
        username: '',
        email: '',
        password: '',
        passwordValidation: '',
      };
    }

    case IS_SIGN_UP_PROCESS_OVER: {
      return {
        ...state,
        isSignUpProcessOver: true,
      };
    }

    case ERROR_WHILE_CREATING_USER: {
      return {
        ...state,
        errorWhileCreatingUser: true,
      };
    }

    case ERROR_WHILE_SENDING_EMAIL: {
      return {
        ...state,
        errorWhileSendingEmail: true,
      };
    }

    default:
      return state;
  }
};

export default signUpReducer;
