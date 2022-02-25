import { GamesHistoryPanelProps } from '../components/GamesHistoryPanel';
import { PLAYER_BADGE } from '../models/players';

const gamesHistoryData: Array<GamesHistoryPanelProps> = [
  {
    id: 1,
    date: '1',
    players: [
      {
        id: 1,
        name: 'Tsuricate',
        badge: PLAYER_BADGE.Gold,
      },
      {
        id: 2,
        name: 'Trololo',
        badge: PLAYER_BADGE.Silver,
      },
    ],
  },
  {
    id: 2,
    date: '2',
    players: [
      {
        id: 2,
        name: 'Trololo',
        badge: PLAYER_BADGE.Gold,
      },
      {
        id: 1,
        name: 'Tsuricate',
        badge: PLAYER_BADGE.Silver,
      },
    ],
  },
  {
    id: 3,
    date: '3',
    players: [
      {
        id: 3,
        name: 'Natsu',
        badge: PLAYER_BADGE.Gold,
      },
      {
        id: 2,
        name: 'Trololo',
        badge: undefined,
      },
      {
        id: 1,
        name: 'Tsuricate',
        badge: PLAYER_BADGE.Silver,
      },
      {
        id: 4,
        name: 'Thaïs',
        badge: PLAYER_BADGE.Bronze,
      },
    ],
  },
];

export default gamesHistoryData;
