import { SELECTORS, URLS } from '../support/constants';

describe('The Join Game page', () => {
  before(() => {
    cy.visit(URLS.JOIN_GAME_PAGE);
  });

  beforeEach(() => {
    cy.get(SELECTORS.PAGE_CONTENT).as('pageContent');
  });

  it('has a title', () => {
    cy.get('@pageContent').find(SELECTORS.PAGE_TITLE).should('be.visible');
  });

  it('has description', () => {
    cy.get('@pageContent').find('p').should('be.visible');
  });

  it('provides user a way to sign in', () => {
    cy.get('@pageContent').find(SELECTORS.SIGNIN_BUTTON).should('be.visible');
  });

  it('provides user a way to choose an avatar', () => {
    cy.get('@pageContent').find(SELECTORS.AVATAR_SELECTOR).should('be.visible');
  });

  it('provides user a way to choose its username', () => {
    cy.get('@pageContent').find(SELECTORS.USERNAME_INPUT).should('be.visible');
  });

  it('provides user a way to choose a game to join', () => {
    cy.get('@pageContent').find(SELECTORS.GAMEID_INPUT).should('be.visible');
  });

  it('provides user a way to join the game', () => {
    cy.get('@pageContent').find(SELECTORS.SUBMIT_BUTTON).should('be.visible');
  });
});
