import { AnyAction } from 'redux';
import { UPDATE_USER_INFOS } from '../actions/manageAccount';

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
