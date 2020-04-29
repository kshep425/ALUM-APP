import routes, {home} from '../../fixtures/constants'

describe('Sign In Test',()=>{
  beforeEach(()=> {
    cy.reload()
    cy.visit(routes.home)
  })

  after(() => {
    cy.logout()
  })

  it ('Validate Sign In Page', ()=>{
    cy.visit(routes.signin)
    cy.get('input[name=email]')
    cy.get('input[name=password]')
    cy.get('a').contains('Forgot Password?')
    cy.get('a').contains('Sign Up')
  })

  it ('Sign In User', () => {
    const num = Math.floor( Math.random() * 500000 )
    cy.log(num)
    cy.login(`email${num}@email.com`, Cypress.env('password'));
    cy.location('pathname').should('include', home)
    cy.get('.navItemDiv').should('contain', 'My MSU')
  })
})