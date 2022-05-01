import { AnyAction } from 'redux';
import { HAS_UPDATED_INFOS } from '../actions/manageAccount';
import { INIT_MANAGE_ACCOUNT, UPDATE_USER_INFOS } from '../actions/manageAccount';

interface manageAccountReducerProps {
  id: string;
  username: string;
  email: string;
  hasUpdatedInfos: boolean;
}

const initialState: manageAccountReducerProps = {
  id: '',
  username: '',
  email: '',
  hasUpdatedInfos: false,
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

    case HAS_UPDATED_INFOS: {
      return {
        ...state,
        hasUpdatedInfos: action.value,
      };
    }

    default:
      return state;
  }
};

export default manageAccountReducer;
