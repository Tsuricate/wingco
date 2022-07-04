import { AvatarImage, Player } from '../../models/players';

export const UPDATE_JOIN_GAME_SLUG = 'UPDATE_JOIN_GAME_SLUG';
export const JOIN_GAME_REQUEST = 'JOIN_GAME_REQUEST';
export const ANSWER_JOIN_REQUEST = 'ANSWER_JOIN_REQUEST';
export const ADD_PLAYER_IN_QUEUE = 'ADD_PLAYER_IN_QUEUE';
export const DELETE_PLAYER_IN_QUEUE = 'DELETE_PLAYER_IN_QUEUE';
export const UPDATE_GUEST_PLAYER_INFOS = 'UPDATE_GUEST_PLAYER_INFOS';
export const UPDATE_IS_LOADING = 'UPDATE_IS_LOADING';

export const updateJoinGameSlug = (value: string, name: string) => ({
  type: UPDATE_JOIN_GAME_SLUG,
  value,
  name,
});

export const joinGameRequest = () => ({
  type: JOIN_GAME_REQUEST,
});

export const answerJoinRequest = (
  playerId: string,
  isAccepted: boolean,
  gameSlug: string,
  declinedReason?: string
) => ({
  type: ANSWER_JOIN_REQUEST,
  playerId,
  isAccepted,
  gameSlug,
  declinedReason,
});

export const addPlayerInQueue = (player: Player) => ({
  type: ADD_PLAYER_IN_QUEUE,
  player,
});

export const deletePlayerInQueue = (playerId: Player['id']) => ({
  type: DELETE_PLAYER_IN_QUEUE,
  playerId,
});

export const updateGuestPlayerInfos = (value: string | AvatarImage, name: string) => ({
  type: UPDATE_GUEST_PLAYER_INFOS,
  value,
  name,
});

export const updateIsLoading = (value: boolean) => ({
  type: UPDATE_IS_LOADING,
  value,
});
