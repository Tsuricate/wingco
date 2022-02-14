import { SELECTORS, URLS, DEVICES } from '../support/constants';

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

  it('contains a link to home page', () => {
    cy.get('@navbar').find(`li a[href="${URLS.HOME_PAGE}"]`);
  });

  it('contains a link to sign in', () => {
    cy.get('@navbar').find(`li a[href="${URLS.SIGN_IN_PAGE}"]`);
  });

  it('contains a link to new game page', () => {
    cy.get('@navbar').find(`li a[href="${URLS.NEW_GAME_PAGE}"]`);
  });

  it('contains a link to join game page', () => {
    cy.get('@navbar').find(`li a[href="${URLS.JOIN_GAME_PAGE}"]`);
  });

  context('on small viewport', () => {
    before(() => {
      cy.viewport(DEVICES.MOBILE);
    });

    it('has a burger button', () => {
      cy.get('@navbar').find(SELECTORS.BURGER_BUTTON);
    });

    it('burger button opens menu on click', () => {
      cy.get(SELECTORS.BURGER_BUTTON).click();
      cy.get(SELECTORS.BURGER_MENU).should('be.visible');
    });
  });

  // it('contains a link to personal account', () => {
  //   cy.get('@navbar').find(`li a[href="${URLS.ACCOUNT_PAGE}"]`);
  // });

  // it('provides user a link to sign out when signed in', () => {
  //   before(() => {
  //     signIn();
  //   })
  //   cy.get('@navbar').find(`li a[href="${URLS.SIGN_OUT_PAGE}"]`);
  // });
});
