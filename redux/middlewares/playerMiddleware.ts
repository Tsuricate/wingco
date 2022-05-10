import axios from 'axios';
import { Action, Dispatch, Middleware } from 'redux';
import { GET_AVATAR_IMAGES, saveAvatarImages } from '../actions/player';

const playerMiddleware: Middleware = (store) => (next: Dispatch) => async (action: Action) => {
  switch (action.type) {
    case GET_AVATAR_IMAGES: {
      axios.get('/api/user/change-avatar').then((res) => {
        if (res.status === 200) {
          store.dispatch(saveAvatarImages(res.data.avatarImages.data.assets));
        }
      });

      next(action);
      break;
    }
    default:
      next(action);
  }
};
export default playerMiddleware;
