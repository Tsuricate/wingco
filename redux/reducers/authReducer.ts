import { AnyAction } from 'redux';
import { UPDATE_EMAIL } from '../actions/auth';

const initialState = {
  name: '',
  email: '',
  password: '',
  isLogged: false,
};

const authReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case UPDATE_EMAIL:
      return {
        ...state,
        email: action.email,
      };

    default:
      return state;
  }
};

export default authReducer;
