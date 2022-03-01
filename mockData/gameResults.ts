import Player, { PLAYER_BADGE } from '../models/players';
import uniqid from 'uniqid';

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
