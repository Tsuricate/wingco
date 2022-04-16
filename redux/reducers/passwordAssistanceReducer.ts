import { AnyAction } from 'redux';
import { UPDATE_PASSWORD_ASSISTANCE_INFOS } from '../actions/passwordAssistance';

interface passwordAssistanceReducerProps {
  email: string;
  resetCode: string;
  password: string;
  passwordValidation: string;
}

const initialState: passwordAssistanceReducerProps = {
  email: '',
  resetCode: '',
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
    default:
      return state;
  }
};

export default passwordAssistanceReducer;
