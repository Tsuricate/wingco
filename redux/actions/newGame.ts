import { NewGamePlayer } from '../../models/players';

export const SAVE_FIRST_PLAYER = 'SAVE_FIRST_PLAYER';

export const saveFirstPlayer = (newPlayer: NewGamePlayer) => ({
  type: SAVE_FIRST_PLAYER,
  newPlayer,
});
