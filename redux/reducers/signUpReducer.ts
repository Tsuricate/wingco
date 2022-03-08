import { AnyAction } from 'redux';
import { UPDATE_SIGN_UP_INFOS } from '../actions/signUp';

const initialState = {
  username: '',
  email: '',
  password: '',
  passwordValidation: '',
  isLogged: false,
};

const signUpReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case UPDATE_SIGN_UP_INFOS:
      return {
        ...state,
        [action.name]: action.value,
      };

    default:
      return state;
  }
};

export default signUpReducer;
