import { AnyAction } from 'redux';
import { HAS_CHANGED_USERNAME } from '../actions/auth';
import { INIT_MANAGE_ACCOUNT, UPDATE_USER_INFOS } from '../actions/manageAccount';

interface manageAccountReducerProps {
  id: string;
  username: string;
  email: string;
  hasChangedUsername: boolean;
}

const initialState: manageAccountReducerProps = {
  id: '',
  username: '',
  email: '',
  hasChangedUsername: false,
};

const manageAccountReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case INIT_MANAGE_ACCOUNT: {
      return {
        ...state,
        id: action.id,
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

    case HAS_CHANGED_USERNAME: {
      return {
        ...state,
        hasChangedUsername: action.value,
      };
    }

    default:
      return state;
  }
};

export default manageAccountReducer;
