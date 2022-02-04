import { SELECTORS, URLS } from '../support/constants';

describe('The Navigation Bar', () => {
  before(() => {
    cy.visit(URLS.HOME_PAGE);
  });

  beforeEach(() => {
    cy.get(SELECTORS.NAVBAR).as('navbar');
  });

  it('is visible', () => {
    cy.get('@navbar').should('be.visible');
  });

  it('provides user a link to new game page', () => {
    cy.get('@navbar').find(`li a[href="${URLS.NEW_GAME_PAGE}"]`);
  });

  it('provides user a link to join game page', () => {
    cy.get('@navbar').find(`li a[href="${URLS.JOIN_GAME_PAGE}"]`);
  });

  it('provides user a link to sign in', () => {
    cy.get('@navbar').find(`li a[href="${URLS.SIGN_IN_PAGE}"]`);
  });

  // it('provides user a link to sign out when signed in', () => {
  //   before(() => {
  //     signIn();
  //   })
  //   cy.get('@navbar').find(`li a[href="${URLS.SIGN_OUT_PAGE}"]`);
  // });
});
