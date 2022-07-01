import { Player } from '../../models/players';

export const UPDATE_JOIN_GAME_SLUG = 'UPDATE_JOIN_GAME_SLUG';
export const JOIN_GAME_REQUEST = 'JOIN_GAME_REQUEST';
export const ANSWER_JOIN_REQUEST = 'ANSWER_JOIN_REQUEST';
export const ADD_PLAYER_IN_QUEUE = 'ADD_PLAYER_IN_QUEUE';
export const DELETE_PLAYER_IN_QUEUE = 'DELETE_PLAYER_IN_QUEUE';

export const updateJoinGameSlug = (value: string, name: string) => ({
  type: UPDATE_JOIN_GAME_SLUG,
  value,
  name,
});

export const joinGameRequest = () => ({
  type: JOIN_GAME_REQUEST,
});

export const answerJoinRequest = (playerId: string, isAccepted: boolean, gameSlug: string) => ({
  type: ANSWER_JOIN_REQUEST,
  playerId,
  isAccepted,
  gameSlug,
});

export const addPlayerInQueue = (player: Player) => ({
  type: ADD_PLAYER_IN_QUEUE,
  player,
});

export const deletePlayerInQueue = (playerId: Player['id']) => ({
  type: DELETE_PLAYER_IN_QUEUE,
  playerId,
});
