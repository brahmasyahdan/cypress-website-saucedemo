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

// Cypress.Commands.add('login', (username, password) => {
//     cy.session(
//       username,
//       () => {
//         cy.visit('https://www.saucedemo.com/v1/index.html')
//         cy.get('#user-name').type('standard_user')
//         cy.get('#password').type('secret_sauce')
//         cy.get('.btn_action').click()
//         cy.url().should('eq', 'https://www.saucedemo.com/v1/inventory.html')
//         cy.get('.product_label').should('contain', 'Product')
//         cy.get('img.inventory_item_img').should('have.prop', 'naturalWidth').and('be.greaterThan', 0);
//       },
      
//     )
//   })

// fungsi login untuk dipanggil 
Cypress.Commands.add('login', (username, password) => {
  cy.visit('/v1/index.html')
  cy.get('#user-name').should('be.enabled')
  cy.get('#user-name').type('standard_user')
  cy.get('#password').should('be.enabled')
  cy.get('#password').type('secret_sauce')
  cy.get('.btn_action').should('be.enabled')
  cy.get('.btn_action').click()
  cy.url().should('eq', 'https://www.saucedemo.com/v1/inventory.html')
  cy.get('.product_label')
    .should('contain', 'Product')
  cy.get('img.inventory_item_img').should('have.prop', 'naturalWidth').and('be.greaterThan', 0);
  })
