import { AnyAction } from 'redux';

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
    default:
      return state;
  }
};

export default manageAccountReducer;
