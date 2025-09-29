import { AccountPanelProps } from '../components/AccountPanel';

export const panels: Array<AccountPanelProps> = [
  {
    title: 'account:statistics',
    background: 'blackAlpha.100',
    url: '/account/statistics',
  },
  {
    title: 'account:gamesHistory',
    background: 'blackAlpha.200',
    url: '/account/games-history',
  },
  {
    title: 'account:manageAccount',
    background: 'blackAlpha.300',
    url: '/account/manage',
  },
];
