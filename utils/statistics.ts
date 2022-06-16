import { Rank, Victories } from '../models/statistics';

export const getPlayerVictories = (playerStatistics: Array<Rank>): Victories => {
  const victories = playerStatistics.filter((stat) => stat.rank === 1).length;
  const allGames = playerStatistics.length;
  return { victories, allGames };
};
