import { SELECTORS, URLS } from '../support/constants';

describe('The Sign In Page', () => {
  before(() => {
    cy.visit(URLS.SIGN_IN_PAGE);
  });

  it('has a title', () => {
    cy.get(SELECTORS.PAGE_TITLE).should('be.visible');
  });

  it('has an username input', () => {
    cy.get(SELECTORS.USERNAME_INPUT).should('be.visible');
  });

  it('has an password input', () => {
    cy.get(SELECTORS.PASSWORD_INPUT).should('be.visible');
  });

  it('has a link to forgot password page', () => {
    cy.get(`a[href="${URLS.FORGOT_PASSWORD_PAGE}"]`).should('be.visible');
  });

  it('has a remember me checkbox', () => {
    cy.get(SELECTORS.REMEMBER_ME_INPUT).should('be.visible');
  });

  it('has a sign in button', () => {
    cy.get(SELECTORS.SIGNIN_BUTTON).should('be.visible');
  });

  it('has a link to sign up page', () => {
    cy.get(`a[href="${URLS.SIGN_UP_PAGE}"]`).should('be.visible');
  });
});
