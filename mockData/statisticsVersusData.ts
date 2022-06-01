import { VersusPanelProps } from '../components/VersusPanel';
import uniqid from 'uniqid';

export const statisticsVersusData: Array<VersusPanelProps> = [
  {
    title: 'Total score',
    hasBestScore: false,
    bestScore: 124,
    player: {
      id: uniqid(),
      name: 'Tsuricate',
      avatar: { id: '', url: '' },
    },
  },
  {
    title: 'Feathers',
    hasBestScore: true,
    bestScore: 25,
    player: {
      id: uniqid(),
      name: 'Trololo',
      avatar: { id: '', url: '' },
    },
  },
];
