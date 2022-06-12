export const UPDATE_PLAYER_SCORE = 'UPDATE_PLAYER_SCORE';
export const SEND_GAME_SCORES = 'SEND_GAME_SCORES';

export const updatePlayerScore = (value: number, category: string, playerId: string) => ({
  type: UPDATE_PLAYER_SCORE,
  value,
  category,
  playerId,
});

export const sendGameScores = () => ({
  type: SEND_GAME_SCORES,
});
