import { GamesHistoryPanelProps } from '../components/GamesHistoryPanel';
import { PLAYER_BADGE } from '../models/players';
import uniqid from 'uniqid';

const gamesHistoryData: Array<GamesHistoryPanelProps> = [
  {
    id: 1,
    date: '1',
    players: [
      {
        id: uniqid(),
        name: 'Tsuricate',
        badge: PLAYER_BADGE.Gold,
        avatar: { id: '', url: '' },
      },
      {
        id: uniqid(),
        name: 'Trololo',
        badge: PLAYER_BADGE.Silver,
        avatar: { id: '', url: '' },
      },
    ],
  },
  {
    id: 2,
    date: '2',
    players: [
      {
        id: uniqid(),
        name: 'Trololo',
        badge: PLAYER_BADGE.Gold,
        avatar: { id: '', url: '' },
      },
      {
        id: uniqid(),
        name: 'Tsuricate',
        badge: PLAYER_BADGE.Silver,
        avatar: { id: '', url: '' },
      },
    ],
  },
  {
    id: 3,
    date: '3',
    players: [
      {
        id: uniqid(),
        name: 'Natsu',
        badge: PLAYER_BADGE.Gold,
        avatar: { id: '', url: '' },
      },
      {
        id: uniqid(),
        name: 'Trololo',
        badge: undefined,
        avatar: { id: '', url: '' },
      },
      {
        id: uniqid(),
        name: 'Tsuricate',
        badge: PLAYER_BADGE.Silver,
        avatar: { id: '', url: '' },
      },
      {
        id: uniqid(),
        name: 'Thaïs',
        badge: PLAYER_BADGE.Bronze,
        avatar: { id: '', url: '' },
      },
    ],
  },
];

export default gamesHistoryData;
