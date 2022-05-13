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
  avatar?: string;
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

export interface NewGamePlayer {
  id: string;
  name: string;
  avatar: string | undefined;
  isRegistered?: boolean;
}
