export enum PLAYER_BADGE {
  Gold = 'GOLD',
  Silver = 'SILVER',
  Bronze = 'BRONZE',
  Logged = 'LOGGED',
}

export default interface Player {
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
