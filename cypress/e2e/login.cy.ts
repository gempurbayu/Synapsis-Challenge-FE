describe('Login Dialog Test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should login successfully via dialog', () => {
    cy.get('[role="dialog-login"]').should('be.visible');

    cy.get('#name').should('be.visible').type('Gempur', { force: true });
    cy.get('#accessToken')
      .should('be.visible')
      .type(
        'f25c92ff266772e8bdb2bff1d45b9bceea98d364a7601f98db2225b051b236cd',
        { force: true }
      );

    cy.get('#submit').click();

    cy.contains('Gempur').should('be.visible');
  });
});
