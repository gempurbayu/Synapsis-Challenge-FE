beforeEach(() => {
  cy.visit('/');
  cy.window().then((win) => {
    win.localStorage.setItem(
      'accessToken',
      'f25c92ff266772e8bdb2bff1d45b9bceea98d364a7601f98db2225b051b236cd'
    );
    win.localStorage.setItem('name', 'Gempur');
  });
});

describe('Card Click Test', () => {
  it('Clicks on a card and verifies navigation', () => {
    cy.visit('/');

    cy.contains('Enim').click();

    cy.contains('Enim').should('be.visible');
  });
});

describe('Create Post Test', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.window().then((win) => {
      win.localStorage.setItem(
        'accessToken',
        'f25c92ff266772e8bdb2bff1d45b9bceea98d364a7601f98db2225b051b236cd'
      );
      win.localStorage.setItem('name', 'Gempur');
    });
  });

  it('should create a new post successfully', () => {
    cy.visit('/post/183430/');

    cy.contains('Create New Post').click();

    cy.get('#title').should('be.visible').type('My New Post', { delay: 50 });
    cy.get('#user_id').should('be.visible').type('7592788', { delay: 50 });
    cy.get('#body')
      .should('be.visible')
      .type('This is the content of my new post.', { delay: 50 });

    cy.get('#submit').click();

    cy.contains('My New Post').should('be.visible');
  });
});

describe('Edit Post Test', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.window().then((win) => {
      win.localStorage.setItem(
        'accessToken',
        'f25c92ff266772e8bdb2bff1d45b9bceea98d364a7601f98db2225b051b236cd'
      );
      win.localStorage.setItem('name', 'Gempur');
    });
  });

  it('should edit an existing post successfully', () => {
    cy.visit('/post/183430/');

    cy.get('#btn-edit').click();

    cy.get('#title')
      .should('be.visible')
      .clear()
      .type('Updated Post Title', { delay: 50 });
    cy.get('#user_id')
      .should('be.visible')
      .clear()
      .type('1234567', { delay: 50 });
    cy.get('#body')
      .should('be.visible')
      .clear()
      .type('This is the updated content of the post.', { delay: 50 });

    cy.get('#submit').click();

    cy.contains('Updated Post Title').should('be.visible');
    cy.contains('This is the updated content of the post.').should(
      'be.visible'
    );
  });
});

describe('Delete Post Test', () => {
  beforeEach(() => {
    cy.visit('/');

    cy.window().then((win) => {
      win.localStorage.setItem(
        'accessToken',
        'f25c92ff266772e8bdb2bff1d45b9bceea98d364a7601f98db2225b051b236cd'
      );
      win.localStorage.setItem('name', 'Gempur');
    });
  });

  it('should delete a post successfully', () => {
    cy.visit('/');

    cy.get('#search').click();
    cy.get('#search')
      .should('not.be.disabled')
      .type('My New Post', { delay: 50, force: true });

    cy.contains('My New Post').click();

    cy.get('#btn-delete').click();

    cy.location('pathname').should('include', '/posts/183436');

    cy.contains('My New Post').should('not.exist');
    cy.contains('Post deleted successfully').should('be.visible');
  });
});
