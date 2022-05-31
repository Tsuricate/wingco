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

export interface NewPlayer {
  name: string;
  email: string;
  password: string;
}

export interface AvatarImage {
  id: string;
  url: string;
}

export interface InewGamePlayer {
  id: string;
  name: string;
  avatar: AvatarImage;
  isRegistered?: boolean;
}

export interface Score {
  [category: string]: number;
}

export interface IGamePlayer extends InewGamePlayer {
  scores: Array<Score>;
}
