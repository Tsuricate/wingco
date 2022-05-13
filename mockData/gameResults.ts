import uniqid from 'uniqid';
import { Player, PLAYER_BADGE } from '../models/players';
import { categories } from './bestScoreByCategory';

export const gameResults: Array<Player> = [
  {
    id: uniqid(),
    name: 'Chäémelon',
    badge: PLAYER_BADGE.Gold,
    score: 92,
  },
  {
    id: uniqid(),
    name: 'Alex',
    badge: PLAYER_BADGE.Silver,
    score: 86,
  },
  {
    id: uniqid(),
    name: 'Tsuricate',
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
      score: Math.floor(Math.random() * 100),
    },
    {
      id: uniqid(),
      name: 'Alex',
      score: Math.floor(Math.random() * 100),
    },
    {
      id: uniqid(),
      name: 'Tsuricate',
      score: Math.floor(Math.random() * 100),
    },
  ],
}));
