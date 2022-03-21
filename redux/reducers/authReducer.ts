import { AnyAction } from 'redux';

interface authReducerProps {
  id: string;
  name: string;
  avatar: string;
  email: string;
  password: string;
  rememberMe: boolean;
}

const initialState: authReducerProps = {
  id: '',
  name: '',
  avatar: '',
  email: '',
  password: '',
  rememberMe: false,
};

const authReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default authReducer;
