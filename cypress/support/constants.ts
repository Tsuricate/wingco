export const BASE_URL = 'http://localhost:3000';

export enum URLS {
  'HOME_PAGE' = '/',
  'NEW_GAME_PAGE' = '/new-game',
  'JOIN_GAME_PAGE' = '/join-game',
  'SIGN_IN_PAGE' = '/sign-in',
  'SIGN_OUT_PAGE' = '/sign-out',
  'SIGN_UP_PAGE' = '/sign-up',
  'ACCOUNT_PAGE' = '/account',
}
//TODO: List missing pages

export enum SELECTORS {
  'NAVBAR' = 'nav',
  'BURGER_BUTTON' = 'button[data-cy="burgerButton"]',
  'BURGER_MENU' = '[data-cy="burgerMenu"]',
}

export enum DEVICES {
  'MOBILE' = 'iphone-4',
}
