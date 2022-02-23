import { GamesHistoryPanelProps } from '../components/GamesHistoryPanel';

const gamesHistoryData: Array<GamesHistoryPanelProps> = [
  {
    id: 1,
    date: '1',
    players: [
      {
        id: 1,
        name: 'Tsuricate',
        badge: undefined,
      },
      {
        id: 2,
        name: 'Trololo',
        badge: undefined,
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
        badge: undefined,
      },
      {
        id: 1,
        name: 'Tsuricate',
        badge: undefined,
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
        badge: undefined,
      },
      {
        id: 2,
        name: 'Trololo',
        badge: undefined,
      },
      {
        id: 1,
        name: 'Tsuricate',
        badge: undefined,
      },
    ],
  },
];

export default gamesHistoryData;
