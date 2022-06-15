import {
  Category,
  GameResults,
  NewPlayerRecord,
  NewRecord,
  ResultScore,
  ScoreByCategory,
  ScoreResult,
} from '../models/game';
import { Player } from '../models/players';

export const getPlayerInfosById = (players: Array<Player>, playerId: string): Player => {
  const playerInfos = players.find((player) => player.id === playerId);
  if (playerInfos) {
    return playerInfos;
  }
  throw new Error('Player not found');
};

const getCategoriesFromScores = (scores: Array<ScoreResult>) => {
  const initialAccumulator: Array<Category['name']> = [];

  const categories: Array<Category['name']> = scores.reduce((accumulator, currentScore) => {
    if (!accumulator.includes(currentScore.category.name)) {
      accumulator = [...accumulator, currentScore.category.name];
    }
    return accumulator;
  }, initialAccumulator);

  return categories;
};

export const getPlayerScoresByCategory = (
  players: Array<Player>,
  scores: Array<ScoreResult>
): Array<ScoreByCategory> => {
  const categories = getCategoriesFromScores(scores);

  const scoresByCategory = categories.map((categoryName) => {
    const categoryScores = scores
      .filter((score) => score.category.name === categoryName)
      .map((score) => {
        const player = getPlayerInfosById(players, score.player.id);
        return {
          player,
          score: score.value,
        };
      });

    return {
      category: categoryName,
      scores: categoryScores,
    };
  });

  return scoresByCategory;
};

const compareScores = (
  currentScores: Array<ResultScore>,
  previousScores: Array<ResultScore>
): Array<NewRecord> => {
  const initialValue: Array<NewRecord> = [];

  return currentScores.reduce((accumulator, currentScore) => {
    const previousScoresInCurrentCategory = previousScores.filter(
      (previousScore) => previousScore.category.name === currentScore.category.name
    );

    const isRecordBroken =
      previousScoresInCurrentCategory.find(
        (previousScore) => previousScore.value >= currentScore.value
      ) === undefined;

    if (isRecordBroken) {
      const previousScoresInCategory = previousScores
        .filter((score) => score.category.name === currentScore.category.name)
        .map((score) => score.value);
      const previousRecord = Math.max(...previousScoresInCategory);
      const newRecord = {
        newRecord: currentScore.value,
        previousRecord,
        category: currentScore.category.name,
      };

      accumulator = [...accumulator, newRecord];
    }

    return accumulator;
  }, initialValue);
};

export const getNewRecords = (
  registeredPlayersScores: GameResults['registeredPlayersScores']
): Array<NewPlayerRecord> => {
  const initialValue: Array<NewPlayerRecord> = [];

  const newRecords = registeredPlayersScores.reduce((accumulator, currentPlayer) => {
    if (!currentPlayer.previousScores.length) return accumulator;

    const records = compareScores(currentPlayer.currentScores, currentPlayer.previousScores);

    if (records.length) {
      const newRecords: Array<NewPlayerRecord> = records.map((record) => ({
        playerName: currentPlayer.name,
        ...record,
      }));

      accumulator = [...accumulator, ...newRecords];
    }
    return accumulator;
  }, initialValue);

  return newRecords;
};
