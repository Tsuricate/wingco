import { ResultScore } from '../models/game';
import { Player } from '../models/players';
import {
  PlayerGamesScores,
  Rank,
  ResultScoreWithPlayer,
  VersusResult,
  Victories,
} from '../models/statistics';
import { getCategoriesFromScores } from './gameResults';

export const getPlayerVictories = (playerStatistics: Array<Rank>): Victories => {
  const victories = playerStatistics.filter((stat) => stat.rank === 1).length;
  const allGames = playerStatistics.length;
  return { victories, allGames };
};

export const getOtherPlayersScores = (games: Array<PlayerGamesScores>): Array<ResultScoreWithPlayer> => {
  const initialValue: Array<ResultScoreWithPlayer> = [];

  const otherPlayersScores = games.reduce((accumulator, gameScores) => {
    accumulator = [...accumulator, ...gameScores.scores];

    return accumulator;
  }, initialValue);

  return otherPlayersScores;
};

const getBestScore = (
  scores: Array<ResultScore> | Array<ResultScoreWithPlayer>,
  categoryName: string
): number => {
  const scoresInCategory = scores
    .filter((score) => score.category.name === categoryName)
    .map((score) => score.value);
  return Math.max(...scoresInCategory);
};

const findPlayersWithBestScore = (
  bestScore: number,
  otherPlayersScores: Array<ResultScoreWithPlayer>,
  categoryName: string
): Array<Player> => {
  return otherPlayersScores
    .filter((score) => score.category.name === categoryName && score.value === bestScore)
    .map((score) => score.player);
};

export const getVersusResults = (
  gameScores: Array<ResultScore>,
  otherPlayersScores: Array<ResultScoreWithPlayer>
): Array<VersusResult> => {
  const categories = getCategoriesFromScores(gameScores);

  const versusResult = categories.map((category) => {
    const personalBestScore: number = getBestScore(gameScores, category);
    const opponentsBestScore: number = getBestScore(otherPlayersScores, category);

    const isDraw = personalBestScore === opponentsBestScore;
    const hasBestScore = personalBestScore >= opponentsBestScore;

    const bestScore = hasBestScore ? personalBestScore : opponentsBestScore;

    const players =
      !hasBestScore || isDraw ? findPlayersWithBestScore(bestScore, otherPlayersScores, category) : null;

    return {
      category: category,
      hasBestScore,
      bestScore,
      isDraw,
      players,
    };
  });

  return versusResult;
};
