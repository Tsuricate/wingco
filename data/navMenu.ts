interface NavLink {
  label: string;
  url: string;
}

const homeLink: NavLink = {
  label: 'home',
  url: '/',
};

const joinGameLink: NavLink = {
  label: 'joinGame',
  url: '/join-game',
};

export const publicNavLinks: Array<NavLink> = [
  homeLink,
  {
    label: 'signIn',
    url: '/sign-in',
  },
  {
    label: 'newGameAsGuest',
    url: '/new-game',
  },
  joinGameLink,
];

export const loggedNavLinks: Array<NavLink> = [
  homeLink,
  {
    label: 'myAccount',
    url: '/account',
  },
  {
    label: 'newGame',
    url: '/new-game',
  },
  joinGameLink,
  {
    label: 'signOut',
    url: '/api/sign-out',
  },
];
