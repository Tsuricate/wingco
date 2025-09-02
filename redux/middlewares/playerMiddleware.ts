import { Middleware, Dispatch } from 'redux';
import { RootState } from '../reducers';
import {
  GET_AVATAR_IMAGES,
  UPDATE_PLAYER_AVATAR,
  PlayerAction,
  saveAvatarImages,
} from '../actions/player';
import { savePlayerAvatar } from '../actions/auth';
import axios from 'axios';

const playerMiddleware: Middleware<{}, RootState> = (store) => (next) => async (action) => {
  const typedAction = action as PlayerAction;

  switch (typedAction.type) {
    case GET_AVATAR_IMAGES: {
      axios.get('/api/user/get-avatar').then((res) => {
        if (res.status === 200) {
          store.dispatch(saveAvatarImages(res.data.avatarImages.data.assets));
        }
      });

      next(action);
      break;
    }

    case UPDATE_PLAYER_AVATAR: {
      const { id } = store.getState().auth;
      const newAvatarId = typedAction.newAvatarId;
      axios.post('/api/user/change-avatar', { id, newAvatarId }).then((res) => {
        store.dispatch(savePlayerAvatar(res.data));
      });

      next(action);
      break;
    }

    default:
      next(action);
  }
};
export default playerMiddleware;
