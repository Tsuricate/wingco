import { SELECTORS, URLS } from '../support/constants';

describe('The password assistance page', () => {
  before(() => {
    cy.visit(URLS.PASSWORD_ASSISTANCE_PAGE);
  });

  context('on step 1', () => {
    it('has a title', () => {
      cy.get('main').find(SELECTORS.PAGE_TITLE).should('be.visible');
    });

    it('has a description', () => {
      cy.get('main').find('p').should('be.visible');
    });

    it('has an email input', () => {
      cy.get('main').find(SELECTORS.EMAIL_INPUT).should('be.visible');
    });

    it('provides user a way to cancel the process and go to sign in page', () => {
      cy.get('main')
        .find(SELECTORS.CANCEL_ACTION)
        .should('be.visible')
        .and('have.attr', 'href', '/sign-in');
    });

    it('provides user a way to submit form', () => {
      cy.get('main').find(SELECTORS.SUBMIT_BUTTON).should('be.visible');
    });
  });

  context('on step 2', () => {
    before(() => {
      cy.get('main').find(SELECTORS.SUBMIT_BUTTON).click();
    });

    it('has a reset code input', () => {
      cy.get('main').find(SELECTORS.RESET_CODE_INPUT).should('be.visible');
    });
  });

  context('on step 3', () => {
    before(() => {
      cy.get('main').find(SELECTORS.SUBMIT_BUTTON).click();
    });

    it('has a password input', () => {
      cy.get('main').find(SELECTORS.PASSWORD_INPUT).should('be.visible');
    });

    it('has a password validation input', () => {
      cy.get('main').find(SELECTORS.PASSWORD_VALIDATION_INPUT).should('be.visible');
    });
  });
});
