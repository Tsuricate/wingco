import { GameWithPlayers, Leaderboard, ScoreCreateInput } from '../models/game';
import { GameResult, IGamePlayer, PlayerWithRegisteredInfos, PLAYER_BADGE } from '../models/players';

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

export const getUpdatedParticipants = (
  initialPlayers: PlayerWithRegisteredInfos[],
  currentPlayers: PlayerWithRegisteredInfos[]
) => {
  const getPlayerChanges = (
    source: PlayerWithRegisteredInfos[],
    comparison: PlayerWithRegisteredInfos[]
  ) => {
    return source.filter((player) => !comparison.some((compPlayer) => compPlayer.id === player.id));
  };

  const newPlayers = getPlayerChanges(currentPlayers, initialPlayers);
  const deletedPlayers = getPlayerChanges(initialPlayers, currentPlayers);
  const registeredPlayers = newPlayers.filter((player) => player.isRegistered);
  const unregisteredPlayers = newPlayers.filter((player) => !player.isRegistered);
  const updatedPlayers = currentPlayers.filter((player) => {
    const original = initialPlayers.find((p) => p.id === player.id);
    if (!original) return false;
    return player.name !== original.name || player.avatar?.id !== original.avatar?.id;
  });

  return {
    connect: registeredPlayers.map((player) => ({
      where: { id: player.id },
    })),
    create: unregisteredPlayers.map((player) => {
      return {
        name: player.name,
        hasVerifiedEmail: false,
        isRegistered: false,
        avatar: { connect: { id: player.avatar.id } },
      };
    }),
    update: updatedPlayers.map((player) => ({
      where: { id: player.id },
      data: {
        name: player.name,
        avatar: { connect: { id: player.avatar.id } },
      },
    })),
    disconnect: deletedPlayers.map((player) => ({ id: player.id })),
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

export const sortPlayersByHost = (game: GameWithPlayers): GameWithPlayers => {
  const hostId = game.hostedBy.id;

  const orderedPlayers = [
    ...game.players.filter((p) => p.id === hostId),
    ...game.players.filter((p) => p.id !== hostId),
  ];
  return { ...game, players: orderedPlayers };
};
