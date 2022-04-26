import { AnyAction } from 'redux';
import { INIT_MANAGE_ACCOUNT, UPDATE_USER_INFOS } from '../actions/manageAccount';

interface manageAccountReducer {
  username: string;
  email: string;
}

const initialState = {
  username: '',
  email: '',
};

const manageAccountReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case INIT_MANAGE_ACCOUNT: {
      return {
        ...state,
        username: action.username,
        email: action.email,
      };
    }
    case UPDATE_USER_INFOS: {
      return {
        ...state,
        [action.name]: action.value,
      };
    }

    default:
      return state;
  }
};

export default manageAccountReducer;
