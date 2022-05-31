import uniqid from 'uniqid';
import { PlayerWithBadgeAndScore, PLAYER_BADGE } from '../models/players';
import { categories } from './bestScoreByCategory';

export const gameResults: Array<PlayerWithBadgeAndScore> = [
  {
    id: uniqid(),
    name: 'Chäémelon',
    avatar: { id: '', url: '' },
    badge: PLAYER_BADGE.Gold,
    score: 92,
  },
  {
    id: uniqid(),
    name: 'Alex',
    avatar: { id: '', url: '' },
    badge: PLAYER_BADGE.Silver,
    score: 86,
  },
  {
    id: uniqid(),
    name: 'Tsuricate',
    avatar: { id: '', url: '' },
    badge: PLAYER_BADGE.Bronze,
    score: 85,
  },
];

export const newRecords = [
  {
    playerName: 'Tsuricate',
    newRecord: 25,
    previousRecord: 23,
    category: 'Tucked cards',
  },
  {
    playerName: 'Alex',
    newRecord: 16,
    previousRecord: 14,
    category: 'Food on cards',
  },
];

export const playerResultsByCategory = categories.map((category) => ({
  category,
  players: [
    {
      id: uniqid(),
      name: 'Chäémelon',
      avatar: { id: '', url: '' },
    },
    {
      id: uniqid(),
      name: 'Alex',
      avatar: { id: '', url: '' },
    },
    {
      id: uniqid(),
      name: 'Tsuricate',
      avatar: { id: '', url: '' },
    },
  ],
}));
