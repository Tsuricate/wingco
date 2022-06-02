export const UPDATE_PLAYER_SCORE = 'UPDATE_PLAYER_SCORE';

export const updatePlayerScore = (value: number, category: string, playerId: string) => ({
  type: UPDATE_PLAYER_SCORE,
  value,
  category,
  playerId,
});
