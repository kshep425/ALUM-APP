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
import routes from '../fixtures/constants'
// -- This is a parent command --
Cypress.Commands.add('login', (email, password) => {
  cy.log(email, password);
  cy.log("Password: ")
  cy.log(password)
  cy.log(Cypress.env('password'))
  cy.request('POST', '/api/test/user', {email, password})
  cy.visit(routes.home)
  cy.visit(routes.signin)
  cy.get('#emailInput').type(email)
  cy.get('#passwordInput').type(password)
  cy.get('button').contains('Sign In').click()
 })

 Cypress.Commands.add('logout', () => {
   cy.log('check if navPhoto exists')
   cy.visit(routes.home)
   if (cy.get('.navPhoto')){
      cy.get('.navPhoto').click();
      cy.get('.signoutBtn').contains('Sign Out').click();
   }
 })
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

// Cypress.Commands.add('getRandomNumber', () => {
//   return Math.floor(Math.random() * 500000 )
// })