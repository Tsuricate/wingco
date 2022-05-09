import { Action, Dispatch, Middleware } from 'redux';
import { getAvatarImages } from '../../utils/api/playerUtils';
import { GET_AVATAR_IMAGES, saveAvatarImages } from '../actions/player';

const playerMiddleware: Middleware = (store) => (next: Dispatch) => async (action: Action) => {
  switch (action.type) {
    case GET_AVATAR_IMAGES: {
      const avatarImages = await getAvatarImages();
      if (avatarImages) {
        store.dispatch(saveAvatarImages(avatarImages.data.assets));
      }

      next(action);
      break;
    }
    default:
      next(action);
  }
};
export default playerMiddleware;
