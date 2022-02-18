import { SELECTORS, URLS } from '../support/constants';

describe('The Sign Up Page', () => {
  before(() => {
    cy.visit(URLS.SIGN_UP_PAGE);
  });

  beforeEach(() => {
    cy.get(SELECTORS.PAGE_CONTENT).as('pageContent');
  });

  it('has a title', () => {
    cy.get('@pageContent').find(SELECTORS.PAGE_TITLE).should('be.visible');
  });

  it('has an username input', () => {
    cy.get('@pageContent').find(SELECTORS.USERNAME_INPUT).should('be.visible');
  });

  it('has an email input', () => {
    cy.get('@pageContent').find(SELECTORS.EMAIL_INPUT).should('be.visible');
  });

  it('has an password input', () => {
    cy.get('@pageContent').find(SELECTORS.PASSWORD_INPUT).should('be.visible');
  });

  it('has a password validation input', () => {
    cy.get('@pageContent').find(SELECTORS.PASSWORD_VALIDATION_INPUT).should('be.visible');
  });

  it('has a sign up button', () => {
    cy.get('@pageContent').find(SELECTORS.SIGNUP_BUTTON).should('be.visible');
  });

  it('has a link to sign in page', () => {
    cy.get('@pageContent').find(`a[href="${URLS.SIGN_IN_PAGE}"]`).should('be.visible');
  });
});
