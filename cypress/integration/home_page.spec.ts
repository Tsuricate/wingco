import { SELECTORS, URLS } from '../support/constants';

describe('The Home Page', () => {
  before(() => {
    cy.visit(URLS.HOME_PAGE);
  });

  beforeEach(() => {
    cy.get(SELECTORS.PAGE_CONTENT).as('pageContent');
  });

  it('has title', () => {
    cy.get('@pageContent').find(SELECTORS.PAGE_TITLE).should('be.visible');
  });

  it('has description', () => {
    cy.get('@pageContent').find('p').should('be.visible');
  });

  it('provides user a link to sign in', () => {
    cy.get('@pageContent').find(`a[href="${URLS.SIGN_IN_PAGE}"]`).should('be.visible');
  });

  it('provides user a link to new game page', () => {
    cy.get('@pageContent').find(`a[href="${URLS.NEW_GAME_PAGE}"]`).should('be.visible');
  });

  it('provides user a link to join game page', () => {
    cy.get('@pageContent').find(`a[href="${URLS.JOIN_GAME_PAGE}"]`).should('be.visible');
  });
});
