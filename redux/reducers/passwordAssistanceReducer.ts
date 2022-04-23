import { AnyAction } from 'redux';
import {
  UPDATE_HAS_CHANGED_PASSWORD,
  UPDATE_HAS_CORRECT_RESET_CODE,
  UPDATE_HAS_PROVIDED_EMAIL,
  UPDATE_HAS_SUBMIT_RESET_CODE,
  UPDATE_IS_LOADING,
  UPDATE_PASSWORD_ASSISTANCE_INFOS,
} from '../actions/passwordAssistance';

interface passwordAssistanceReducerProps {
  email: string;
  resetCode: string;
  hasProvidedEmail: boolean;
  hasSubmitResetCode: boolean;
  hasCorrectResetCode: boolean;
  password: string;
  passwordValidation: string;
  isLoading: boolean;
  hasChangedPassword: boolean;
}

const initialState: passwordAssistanceReducerProps = {
  email: '',
  isLoading: false,
  resetCode: '',
  hasProvidedEmail: false,
  hasSubmitResetCode: false,
  hasCorrectResetCode: false,
  password: '',
  passwordValidation: '',
  hasChangedPassword: false,
};

const passwordAssistanceReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case UPDATE_PASSWORD_ASSISTANCE_INFOS: {
      return {
        ...state,
        [action.name]: action.value,
      };
    }
    case UPDATE_HAS_PROVIDED_EMAIL: {
      return {
        ...state,
        hasProvidedEmail: action.value,
      };
    }
    case UPDATE_HAS_SUBMIT_RESET_CODE: {
      return {
        ...state,
        hasSubmitResetCode: action.value,
      };
    }
    case UPDATE_HAS_CORRECT_RESET_CODE: {
      return {
        ...state,
        hasCorrectResetCode: action.value,
      };
    }
    case UPDATE_IS_LOADING: {
      return {
        ...state,
        isLoading: action.value,
      };
    }
    case UPDATE_HAS_CHANGED_PASSWORD: {
      return {
        ...state,
        hasChangedPassword: true,
      };
    }
    default:
      return state;
  }
};

export default passwordAssistanceReducer;
