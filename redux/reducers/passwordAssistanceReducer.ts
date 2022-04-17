import { AnyAction } from 'redux';
import {
  UPDATE_HAS_CORRECT_RESET_CODE,
  UPDATE_PASSWORD_ASSISTANCE_INFOS,
} from '../actions/passwordAssistance';

interface passwordAssistanceReducerProps {
  email: string;
  resetCode: string;
  hasCorrectResetCode: boolean;
  password: string;
  passwordValidation: string;
}

const initialState: passwordAssistanceReducerProps = {
  email: '',
  resetCode: '',
  hasCorrectResetCode: false,
  password: '',
  passwordValidation: '',
};

const passwordAssistanceReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case UPDATE_PASSWORD_ASSISTANCE_INFOS: {
      return {
        ...state,
        [action.name]: action.value,
      };
    }
    case UPDATE_HAS_CORRECT_RESET_CODE: {
      return {
        ...state,
        hasCorrectResetCode: action.value,
      };
    }
    default:
      return state;
  }
};

export default passwordAssistanceReducer;
