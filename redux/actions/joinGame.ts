export const UPDATE_JOIN_GAME_SLUG = 'UPDATE_JOIN_GAME_SLUG';

export const updateJoinGameSlug = (value: string, name: string) => ({
  type: UPDATE_JOIN_GAME_SLUG,
  value,
  name,
});
