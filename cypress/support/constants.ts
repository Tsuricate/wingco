export const BASE_URL = 'http://localhost:3000';

export enum URLS {
  'HOME_PAGE' = '/',
  'NEW_GAME_PAGE' = '/new-game',
  'JOIN_GAME_PAGE' = '/join-game',
  'SIGN_IN_PAGE' = '/sign-in',
  'SIGN_OUT_PAGE' = '/sign-out',
  'SIGN_UP_PAGE' = '/sign-up',
  'ACCOUNT_PAGE' = '/account',
  'FORGOT_PASSWORD_PAGE' = '/forgot-password',
}
//TODO: List missing pages

export enum SELECTORS {
  'NAVBAR' = 'header',
  'PAGE_TITLE' = 'h1',
  'BURGER_BUTTON' = 'button[data-cy="burgerButton"]',
  'NAV_MENU' = '[data-cy="navMenu"]',
  'USERNAME_INPUT' = 'input[name="username"]',
  'PASSWORD_INPUT' = 'input[name="password"]',
  'REMEMBER_ME_INPUT' = 'input[name="rememberMe"]',
  'SIGNIN_BUTTON' = 'button[name="signIn"]',
}

export enum DEVICES {
  'MOBILE' = 'iphone-4',
  'TABLET' = 'ipad-2',
  'DESKTOP' = 'macbook-13',
}
