import { AnyAction } from 'redux';
import {
  UPDATE_HAS_CORRECT_RESET_CODE,
  UPDATE_HAS_SUBMIT_RESET_CODE,
  UPDATE_IS_LOADING,
  UPDATE_PASSWORD_ASSISTANCE_INFOS,
} from '../actions/passwordAssistance';

interface passwordAssistanceReducerProps {
  email: string;
  resetCode: string;
  hasSubmitResetCode: boolean;
  hasCorrectResetCode: boolean;
  password: string;
  passwordValidation: string;
  isLoading: boolean;
}

const initialState: passwordAssistanceReducerProps = {
  email: '',
  resetCode: '',
  hasSubmitResetCode: false,
  hasCorrectResetCode: false,
  password: '',
  passwordValidation: '',
  isLoading: false,
};

const passwordAssistanceReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case UPDATE_PASSWORD_ASSISTANCE_INFOS: {
      return {
        ...state,
        [action.name]: action.value,
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
    default:
      return state;
  }
};

export default passwordAssistanceReducer;
