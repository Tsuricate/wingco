import { SELECTORS, URLS } from '../support/constants';

describe('The Sign Up Page', () => {
  before(() => {
    cy.visit(URLS.SIGN_UP_PAGE);
  });

  it('has a title', () => {
    cy.get(SELECTORS.PAGE_TITLE).should('be.visible');
  });

  it('has an username input', () => {
    cy.get(SELECTORS.USERNAME_INPUT).should('be.visible');
  });

  it('has an email input', () => {
    cy.get(SELECTORS.EMAIL_INPUT).should('be.visible');
  });

  it('has an password input', () => {
    cy.get(SELECTORS.PASSWORD_INPUT).should('be.visible');
  });

  it('has a password validation input', () => {
    cy.get(SELECTORS.PASSWORD_VALIDATION_INPUT).should('be.visible');
  });

  it('has a sign up button', () => {
    cy.get(SELECTORS.SIGNUP_BUTTON).should('be.visible');
  });

  it('has a link to sign in page', () => {
    cy.get(`a[href="${URLS.SIGN_IN_PAGE}"]`).should('be.visible');
  });
});
