import { PLAYER_BADGE } from '../models/players';

export const getBadgeColor = (playerBadge: PLAYER_BADGE) => {
  switch (playerBadge) {
    case PLAYER_BADGE.Gold:
      return 'gold';
    case PLAYER_BADGE.Silver:
      return 'lightGray';
    case PLAYER_BADGE.Bronze:
      return 'orange.700';
  }
};
