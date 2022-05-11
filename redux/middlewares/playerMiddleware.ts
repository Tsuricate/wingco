import axios from 'axios';
import { AnyAction, Dispatch, Middleware } from 'redux';
import { savePlayerAvatar } from '../actions/auth';
import { GET_AVATAR_IMAGES, saveAvatarImages, UPDATE_PLAYER_AVATAR } from '../actions/player';

const playerMiddleware: Middleware = (store) => (next: Dispatch) => async (action: AnyAction) => {
  switch (action.type) {
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
      const newAvatarId = action.payload.newAvatarId;
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
