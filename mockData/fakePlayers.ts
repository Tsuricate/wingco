import Player from '../models/players';
import uniqid from 'uniqid';

const players: Array<Player> = [
  {
    id: uniqid(),
    name: 'Alex',
  },
  {
    id: uniqid(),
    name: 'Tsuricate',
  },
  {
    id: uniqid(),
    name: 'Chäémelon',
  },
];

export default players;
