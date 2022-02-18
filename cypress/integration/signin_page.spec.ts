import { SELECTORS, URLS } from '../support/constants';

describe('The Sign In Page', () => {
  before(() => {
    cy.visit(URLS.SIGN_IN_PAGE);
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

  it('has an password input', () => {
    cy.get('@pageContent').find(SELECTORS.PASSWORD_INPUT).should('be.visible');
  });

  it('has a link to forgot password page', () => {
    cy.get('@pageContent').find(`a[href="${URLS.FORGOT_PASSWORD_PAGE}"]`).should('be.visible');
  });

  it('has a remember me checkbox', () => {
    cy.get('@pageContent').find(SELECTORS.REMEMBER_ME_INPUT).should('be.visible');
  });

  it('has a sign in button', () => {
    cy.get('@pageContent').find(SELECTORS.SIGNIN_BUTTON).should('be.visible');
  });

  it('has a link to sign up page', () => {
    cy.get('@pageContent').find(`a[href="${URLS.SIGN_UP_PAGE}"]`).should('be.visible');
  });
});
