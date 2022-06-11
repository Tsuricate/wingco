import { IGamePlayer } from './players';

export interface Category {
  id: string;
  name: string;
  isComputed: boolean;
  isFromOceaniaExpansion: boolean;
}

interface ConnectByName {
  name: string;
}

interface ConnectById {
  id: string;
}

export interface PlayerConnectInput {
  connect: ConnectById;
}

interface CategoryConnectInput {
  connect: ConnectByName;
}

export interface ScoreCreateInput {
  category: CategoryConnectInput;
  player: PlayerConnectInput;
  value: number;
}

export type Leaderboard = IGamePlayer[][];
