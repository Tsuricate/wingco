import { IGamePlayer, Player, PLAYER_BADGE } from './players';

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

export interface LeaderboardResult {
  player: { id: Player['id'] };
  badge: PLAYER_BADGE | undefined;
  totalScore: number;
}

export interface ScoreResult {
  player: { id: Player['id'] };
  category: { name: Category['name'] };
  value: number;
}

export interface ScoreByCategory {
  category: Category['name'];
  scores: Array<{ player: Player; score: number }>;
}

export interface ResultScore {
  category: { name: Category['name'] };
  value: number;
}

interface PlayersScores {
  id: string;
  name: Player['name'];
  currentScores: Array<ResultScore>;
  previousScores: Array<ResultScore>;
}

export interface GameResults {
  players: Array<Player>;
  results: Array<LeaderboardResult>;
  scores: Array<ScoreResult>;
  registeredPlayersScores: Array<PlayersScores>;
}

export interface NewPlayerRecord extends NewRecord {
  playerName: Player['name'];
}

export interface NewRecord {
  newRecord: number;
  previousRecord: number;
  category: Category['name'];
}

export interface GameHistoryResults extends GameHistory {
  player: Player;
  badge: PLAYER_BADGE | undefined;
}

export interface GameHistory {
  id: string;
  createdAt: string;
  results: Array<GameHistoryResults>;
}
