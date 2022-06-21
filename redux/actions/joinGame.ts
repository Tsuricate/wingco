export const UPDATE_JOIN_GAME_SLUG = 'UPDATE_JOIN_GAME_SLUG';
export const JOIN_GAME_REQUEST = 'JOIN_GAME_REQUEST';

export const updateJoinGameSlug = (value: string, name: string) => ({
  type: UPDATE_JOIN_GAME_SLUG,
  value,
  name,
});

export const joinGameRequest = () => ({
  type: JOIN_GAME_REQUEST,
});