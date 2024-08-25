// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('loginAndGetToken', (username, password) => {
    cy.request('POST', 'https://localhost:7106/api/v1/Auth/login', {
      username: username,
      password: password
    }).then((response) => {
      const token = response.body.token;
      Cypress.env('auth_token', token);
    });
  });
  
  Cypress.Commands.add('deleteCustomerByEmail', (email) => {
    const token = Cypress.env('auth_token');
    cy.request({
      method: 'DELETE',
      url: `https://localhost:7106/api/v1/Customer/delete-by-email?email=${email}`,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
  