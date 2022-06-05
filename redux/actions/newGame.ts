import { Category } from '../../models/game';
import { IGamePlayer, PlayerWithRegisteredInfos } from '../../models/players';

export const SET_FIRST_PLAYER = 'SET_FIRST_PLAYER';
export const SAVE_CATEGORIES = 'SAVE_CATEGORIES';
export const ADD_PLAYER = 'ADD_PLAYER';
export const REMOVE_PLAYER = 'REMOVE_PLAYER';
export const UPDATE_PLAYER_INFOS = 'UPDATE_PLAYER_INFOS';
export const RESET_GAME_INFOS = 'RESET_GAME_INFOS';
export const UPDATE_GAME_WITH_NECTAR = 'UPDATE_GAME_WITH_NECTAR';
export const CREATE_NEW_GAME = 'CREATE_NEW_GAME';
export const SAVE_NEW_GAME = 'SAVE_NEW_GAME';
export const DELETE_GAME = 'DELETE_GAME';
export const SAVE_GAME_SLUG = 'SAVE_GAME_SLUG';
export const SAVE_GAME_ID = 'SAVE_GAME_ID';
export const UPDATE_UNREGISTERED_PLAYERS_ID = 'UPDATE_UNREGISTERED_PLAYERS_ID';
export const IS_CREATING_NEW_GAME = 'IS_CREATING_NEW_GAME';

export const setFirstPlayer = (player: IGamePlayer) => ({
  type: SET_FIRST_PLAYER,
  player,
});

export const saveCategories = (categories: Array<Category>) => ({
  type: SAVE_CATEGORIES,
  categories,
});

export const addPlayer = (newPlayer: IGamePlayer) => ({
  type: ADD_PLAYER,
  newPlayer,
});

export const removePlayer = (playerId: string) => ({
  type: REMOVE_PLAYER,
  playerId,
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

export const saveGameId = (gameId: string) => ({
  type: SAVE_GAME_ID,
  gameId,
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

export const updateUnregisteredPlayersId = (participants: Array<PlayerWithRegisteredInfos>) => ({
  type: UPDATE_UNREGISTERED_PLAYERS_ID,
  participants,
});

export const isCreatingNewGame = (value: boolean) => ({
  type: IS_CREATING_NEW_GAME,
  value,
});
