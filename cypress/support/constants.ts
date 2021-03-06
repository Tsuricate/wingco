export const BASE_URL = 'http://localhost:3000';

export enum URLS {
  'HOME_PAGE' = '/',
  'NEW_GAME_PAGE' = '/new-game',
  'JOIN_GAME_PAGE' = '/join-game',
  'SIGN_IN_PAGE' = '/sign-in',
  'SIGN_OUT_PAGE' = '/sign-out',
  'SIGN_UP_PAGE' = '/sign-up',
  'ACCOUNT_PAGE' = '/account',
  'PASSWORD_ASSISTANCE_PAGE' = '/password-assistance',
}
//TODO: List missing pages

export enum SELECTORS {
  'NAVBAR' = 'header',
  'PAGE_CONTENT' = 'main',
  'PAGE_TITLE' = 'h1',
  'BURGER_BUTTON' = 'button[data-cy="burgerButton"]',
  'NAV_MENU' = '[data-cy="navMenu"]',
  'USERNAME_INPUT' = 'input[name="username"]',
  'PASSWORD_INPUT' = 'input[name="password"]',
  'PASSWORD_VALIDATION_INPUT' = 'input[name="passwordValidation"]',
  'EMAIL_INPUT' = 'input[name="email"]',
  'REMEMBER_ME_INPUT' = 'input[name="rememberMe"]',
  'SIGNIN_BUTTON' = 'button[data-cy="signIn"]',
  'SIGNUP_BUTTON' = 'button[data-cy="signUp"]',
  'CANCEL_ACTION' = '[data-cy="cancelAction"]',
  'SUBMIT_BUTTON' = 'button[data-cy="submitButton"]',
  'RESET_CODE_INPUT' = 'input[name="resetCode"]',
  'AVATAR_SELECTOR' = '[data-cy="avatarSelector"]',
  'GAMEID_INPUT' = 'input[name=gameId]',
}

export enum DEVICES {
  'MOBILE' = 'iphone-4',
  'TABLET' = 'ipad-2',
  'DESKTOP' = 'macbook-13',
}
