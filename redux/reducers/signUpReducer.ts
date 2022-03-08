import { AnyAction } from 'redux';
import { SAVE_USER, UPDATE_SIGN_UP_INFOS } from '../actions/signUp';

const initialState = {
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

    default:
      return state;
  }
};

export default signUpReducer;
