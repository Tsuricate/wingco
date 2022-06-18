import { Category, ResultScore } from './game';
import { Player } from './players';

export interface Rank {
  rank: number;
}

export interface Victories {
  victories: number;
  allGames: number;
}

export interface BestPersonalScores {
  category: Category['name'];
  value: number;
}

export interface ResultScoreWithPlayer extends ResultScore {
  player: Player;
}

export interface PlayerGamesScores {
  scores: Array<ResultScoreWithPlayer>;
}

export interface VersusResult {
  category: Category['name'];
  hasBestScore: boolean;
  bestScore: number;
  isDraw: boolean;
  players: Array<Player> | null;
}
