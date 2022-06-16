import { Category } from './game';

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
