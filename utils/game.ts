import client from '../apollo-client';
import { PlayerWithRegisteredInfos, Score } from '../models/players';
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
  return players.map((player) => {
    return player.isRegistered
      ? {
          player: {
            connect: {
              id: player.id,
            },
          },
        }
      : {
          player: {
            create: {
              name: player.name,
              hasVerifiedEmail: false,
              isRegistered: false,
              avatar: { connect: { id: player.avatar.id } },
            },
          },
        };
  });
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
