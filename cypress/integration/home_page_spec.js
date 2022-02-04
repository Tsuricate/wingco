import { URLS } from '../support/constants';

describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit(URLS.HOME_PAGE);
  });

  it('has title', () => {
    cy.get('h1').should('be.visible');
  });

  it('has description', () => {
    cy.get('p').should('be.visible');
  });

  it('provides user a link to new game page', () => {
    cy.get(`a[href="${URLS.NEW_GAME_PAGE}"]`).should('be.visible');
  });

  it('provides user a link to join game page', () => {
    cy.get(`a[href="${URLS.JOIN_GAME_PAGE}"]`).should('be.visible');
  });

  it('provides user a link to sign in', () => {
    cy.get(`a[href="${URLS.SIGN_IN_PAGE}"]`).should('be.visible');
  });
});
