import { AnyAction } from 'redux';

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
    default:
      return state;
  }
};

export default passwordAssistanceReducer;
