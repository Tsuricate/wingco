export enum PLAYER_BADGE {
  Gold = 'GOLD',
  Silver = 'SILVER',
  Bronze = 'BRONZE',
  Logged = 'LOGGED',
}

export interface Player {
  id: string;
  name: string;
  email?: string;
  avatar?: AvatarImage;
  badge?: PLAYER_BADGE | undefined;
  score?: number;
}

export interface IGamePlayer extends InewGamePlayer {
  scores: Array<Score>;
}

export interface InewGamePlayer {
  id: string;
  name: string;
  avatar: AvatarImage;
  isRegistered: boolean;
}

export interface AvatarImage {
  id: string;
  url: string;
}

export interface Score {
  [category: string]: number;
}
