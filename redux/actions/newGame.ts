import { InewGamePlayer } from '../../models/players';

export const ADD_PLAYER = 'ADD_PLAYER';
export const REMOVE_PLAYER = 'REMOVE_PLAYER';
export const UPDATE_PLAYER_INFOS = 'UPDATE_PLAYER_INFOS';
export const RESET_GAME_INFOS = 'RESET_GAME_INFOS';

export const addPlayer = (newPlayer: InewGamePlayer) => ({
  type: ADD_PLAYER,
  newPlayer,
});

export const removePlayer = (newPlayersList: Array<InewGamePlayer>) => ({
  type: REMOVE_PLAYER,
  newPlayersList,
});

export const updatePlayerInfos = (value: string, playerId: string) => ({
  type: UPDATE_PLAYER_INFOS,
  value,
  playerId,
});

export const resetGameInfos = () => ({
  type: RESET_GAME_INFOS,
});
