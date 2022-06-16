import { Rank, Statistics } from '../models/statistics';

export const getPlayerVictories = (playerStatistics: Array<Rank>): Statistics => {
  const victories = playerStatistics.filter((stat) => stat.rank === 1).length;
  const allGames = playerStatistics.length;
  return { victories, allGames };
};
