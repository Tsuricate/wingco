import { AnyAction } from 'redux';

interface joinGameReducerProps {
  gameSlug: string;
}

const initialState: joinGameReducerProps = {
  gameSlug: '',
};

const joinGameReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default joinGameReducer;
