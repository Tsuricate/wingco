import { InewGamePlayer } from '../../models/players';

export const SET_FIRST_PLAYER = 'SET_FIRST_PLAYER';
export const ADD_PLAYER = 'ADD_PLAYER';
export const REMOVE_PLAYER = 'REMOVE_PLAYER';
export const UPDATE_PLAYER_INFOS = 'UPDATE_PLAYER_INFOS';
export const RESET_GAME_INFOS = 'RESET_GAME_INFOS';
export const UPDATE_GAME_WITH_NECTAR = 'UPDATE_GAME_WITH_NECTAR';
export const CREATE_NEW_GAME = 'CREATE_NEW_GAME';
export const SAVE_NEW_GAME = 'SAVE_NEW_GAME';
export const DELETE_GAME = 'DELETE_GAME';
export const SAVE_GAME_SLUG = 'SAVE_GAME_SLUG';

export const setFirstPlayer = (player: InewGamePlayer) => ({
  type: SET_FIRST_PLAYER,
  player,
});

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

export const updateGameWithNectar = (value: boolean) => ({
  type: UPDATE_GAME_WITH_NECTAR,
  value,
});

export const saveGameSlug = (slug: string) => ({
  type: SAVE_GAME_SLUG,
  slug,
});

export const createNewGame = () => ({
  type: CREATE_NEW_GAME,
});

export const saveNewGame = (id: string) => ({
  type: SAVE_NEW_GAME,
  id,
});

export const deleteGame = () => ({
  type: DELETE_GAME,
});
