import client from '../apollo-client';
import { Leaderboard, ScoreCreateInput } from '../models/game';
import {
  GameResult,
  IGamePlayer,
  PlayerWithRegisteredInfos,
  PLAYER_BADGE,
  Score,
} from '../models/players';
import { GET_CATEGORIES } from '../queries/game.queries';

export const getEstimatedTime = (totalMinutes: number) => {
  const hours = totalMinutes / 60;
  const rhours = Math.floor(hours);
  const minutes = (hours - rhours) * 60;
  const rminutes = Math.round(minutes);
  const hDisplay = rhours > 0 ? rhours + ' h ' : '';
  const mDisplay = rminutes > 0 ? rminutes + (rminutes == 1 ? ' minute ' : ' minutes ') : '';
  return hDisplay + mDisplay;
};

export const getParticipantsFromPlayers = (players: Array<PlayerWithRegisteredInfos>) => {
  const registeredPlayers = players.filter((player) => player.isRegistered);
  const unregisteredPlayers = players.filter((player) => !player.isRegistered);

  return {
    connect: registeredPlayers.map((player) => {
      return { id: player.id };
    }),
    create: unregisteredPlayers.map((player) => {
      return {
        name: player.name,
        hasVerifiedEmail: false,
        isRegistered: false,
        avatar: { connect: { id: player.avatar.id } },
      };
    }),
  };
};

export const getTotalScore = (scoresArray: number[]): number => {
  return scoresArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
};

export const getScoresFromPlayers = (players: Array<IGamePlayer>) => {
  const playersScores: Array<ScoreCreateInput> = [];
  players.forEach((player) => {
    Object.entries(player.scores).forEach(([category, value]) => {
      playersScores.push({
        category: { connect: { name: category } },
        player: { connect: { id: player.id } },
        value,
      });
    });
  });

  return playersScores;
};

const gameBadges = [PLAYER_BADGE.Gold, PLAYER_BADGE.Silver, PLAYER_BADGE.Bronze];

const getLeaderboard = (players: Array<IGamePlayer>): Leaderboard => {
  const initialAccumulator: Leaderboard = [];
  const playersSortedByScores = players.sort((a, b) => b.scores.totalScore - a.scores.totalScore);

  return playersSortedByScores.reduce((accumulator, currentPlayer) => {
    const index = accumulator.length;
    const previousIndex = index - 1;
    const previousPlayerTotalScore = index > 0 ? accumulator[previousIndex][0].scores.totalScore : 0;

    if (currentPlayer.scores.totalScore === previousPlayerTotalScore) {
      accumulator[previousIndex] = [...(accumulator[previousIndex] || []), currentPlayer];
    } else {
      accumulator[index] = [...(accumulator[index] || []), currentPlayer];
    }

    return accumulator;
  }, initialAccumulator);
};

const getPlayerRank = (player: IGamePlayer, leaderboard: Leaderboard): GameResult['rank'] => {
  const rank = leaderboard.reduce((accumulator, leaderboardPosition, index) => {
    const playerFound =
      leaderboardPosition.find((leaderboardPlayer) => player.id === leaderboardPlayer.id) !== undefined;

    if (playerFound) {
      accumulator = index + 1;
    }
    return accumulator;
  }, 0);

  return rank;
};

export const getResultsFromPlayers = (players: Array<IGamePlayer>) => {
  const leaderboard = getLeaderboard(players);

  const playersLeaderboard: Array<GameResult> = players.map((player) => {
    const rank: GameResult['rank'] = getPlayerRank(player, leaderboard);
    const badge: GameResult['badge'] = gameBadges[rank - 1];

    return {
      player: { connect: { id: player.id } },
      totalScore: player.scores.totalScore,
      rank: rank,
      badge: badge,
    };
  });

  return playersLeaderboard;
};

export const getCategories = async () => {
  try {
    const {
      data: { categories },
    } = await client.query({
      query: GET_CATEGORIES,
    });
    return categories;
  } catch (err) {
    throw new Error('Cannot fetch categories');
  }
};

export const defaultAvatar = {
  id: 'cl3lozvfa7k690euj8n7af00q',
  url: 'https://media.graphassets.com/resize=fit:crop,height:96,width:96/kIFwuLNGRZi0DKWGZ5Ae',
};

export const defaultScores: Score = {
  totalScore: 0,
  birds: 0,
  bonusCards: 0,
  endOfRoundGoals: 0,
  eggs: 0,
  foodOnCards: 0,
  tuckedCards: 0,
  nectar: 0,
};
