import { AnyAction } from 'redux';
import {
  ERROR_WHILE_CREATING_USER,
  ERROR_WHILE_SENDING_EMAIL,
  SHOW_SIGN_UP_MODAL,
  RESET_FORM,
  UPDATE_SIGN_UP_INFOS,
  RESET_ERRORS,
} from '../actions/signUp';

interface initialStateProps {
  username: string;
  email: string;
  password: string;
  passwordValidation: string;
  showSignUpModal: boolean;
  errorWhileCreatingUser: boolean;
  errorWhileSendingEmail: boolean;
  isRegistered: boolean;
}

const initialState: initialStateProps = {
  username: '',
  email: '',
  password: '',
  passwordValidation: '',
  showSignUpModal: false,
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

    case RESET_ERRORS: {
      return {
        ...state,
        showSignUpModal: false,
        errorWhileCreatingUser: false,
        errorWhileSendingEmail: false,
      };
    }

    case SHOW_SIGN_UP_MODAL: {
      return {
        ...state,
        showSignUpModal: true,
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
