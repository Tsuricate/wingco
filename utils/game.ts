import { InewGamePlayer } from '../models/players';

export const getEstimatedTime = (totalMinutes: number) => {
  const hours = totalMinutes / 60;
  const rhours = Math.floor(hours);
  const minutes = (hours - rhours) * 60;
  const rminutes = Math.round(minutes);
  const hDisplay = rhours > 0 ? rhours + ' h ' : '';
  const mDisplay = rminutes > 0 ? rminutes + (rminutes == 1 ? ' minute ' : ' minutes ') : '';
  return hDisplay + mDisplay;
};

export const getParticipantsFromPlayers = (players: Array<InewGamePlayer>) => {
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
            },
          },
        };
  });
};
