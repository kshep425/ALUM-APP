import routes, {home} from '../../fixtures/constants'

let user_index = Math.floor(Math.random() * 200000)

describe('Signup Spec', () => {
  beforeEach(()=>{
    cy.visit(routes.signup)
    cy.get('input').clear()
  })

  it('signup page elements exist', () => {
    cy.get('input[name=fullName]')
    cy.get('input[name=email]')
    cy.get('input[name=passwordOne]')
    cy.get('input[name=passwordTwo]')
    cy.get('button[disabled]')
  });

  it('signup page - matching passwords - enables signup button', ()=>{
    cy.get('input[name=fullName]').type('full name')
    cy.get('input[name=email]').type('email@email.com')
    cy.get('button[disabled]')
    cy.get('input[name=passwordOne]').type('password')
    cy.get('button[disabled]')
    cy.get('input[name=passwordTwo]').type('password2')
    cy.get('button[disabled]')
    cy.get('input[name=passwordTwo]').clear().type('password')
    cy.get('button[type=submit]').not('[disabled]')
  })

  it('signup page - signup - non-verified email', ()=>{
    // fill out form
    cy.get('input[name=fullName]').type('full name3')
    cy.get('input[name=email]').type(`email${user_index}@email.com`)
    cy.get('input[name=passwordOne]').type('password')
    cy.get('input[name=passwordTwo]').type('password')
    // submit form
    cy.get('button[type=submit]').click()
    // verify successful login routes home
    cy.location('pathname').should('include', home)
    cy.get('.navItemDiv').should('contain', 'Home')
    cy.get('.navItemDiv').should('contain', 'Events')
    cy.get('.navItemDiv').should('contain', 'Scholarships')
    cy.get('.navItemDiv').should('contain', 'About')
    cy.get('.navItemDiv').should('contain', 'My MSU')
    cy.get('.slick-slider')
    // open mymsu page, verify email verification email sent
    cy.get('.navItemDiv').contains('My MSU').click()
    cy.get('.verificationEmailText').should('contain', 'Verify your E-Mail: Check your E-Mails (Spam folder included) for a confirmation E-Mail or send another confirmation E-Mail.')
    cy.get('.verificationEmailButton').should('contain', 'Send confirmation E-Mail')
    cy.get('.navPhoto')
    cy.get('.dropdownLink').should('contain', 'My MSU')
    cy.get('.signoutBtn').should('contain', 'Sign Out');
    cy.get('.navPhoto').click();
    cy.get('.signoutBtn').contains('Sign Out').click();
  })

});