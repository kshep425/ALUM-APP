import routes, { signedInUserRoutes, signedInUserRoutesArr, signedInUserNoRoutesArr, unknownPath, home } from '../../fixtures/constants'

let user_index = Math.floor(Math.random() * 200000)

describe('Logged In Routes Spec', () => {
  before(() => {
    //create user
    user_index += 1;
    cy.login(`username${user_index}@email.com`, Cypress.env('password'));
    cy.location('pathname').should('include', home)
    cy.visit(routes.home)
    cy.get('.navItemDiv').should('contain', 'My MSU')
  })

  after(() => {
    //   cy.request('POST', '/api/test/signout', {})
    cy.logout()
  })

  it("Logged In Has Correct Navbar with MyMSU page", () => {
    cy.get('.navItemDiv').should('contain', 'My MSU')
    cy.get('.navItemDiv').should('contain', 'Home')
    cy.get('.navItemDiv').should('contain', 'Events')
    cy.get('.navItemDiv').should('contain', 'Scholarships')
    cy.get('.navItemDiv').should('contain', 'About')
  })

  it(`${unknownPath} - redirects to home`, () => {
    cy.visit(unknownPath)
    cy.location('pathname').should('include', unknownPath)
    cy.get('.navItemDiv').should('contain', 'My MSU')
    cy.get('.navItemDiv').should('contain', 'Home')
    cy.get('.navItemDiv').should('contain', 'Events')
    cy.get('.navItemDiv').should('contain', 'Scholarships')
    cy.get('.navItemDiv').should('contain', 'About')
    cy.get('.slick-slider')
  })

  signedInUserNoRoutesArr.forEach(route => {
    it(`${route} - redirects to home`, () => {
      cy.visit(route)
      cy.location('pathname').should('include', home)
    })
  })

  it(`${routes.home} - .click() - click on a DOM element`, () => {
    // https://on.cypress.io/click
    cy.visit(routes.home)

    cy.get('.navItemDiv').contains('Home').click()
    cy.location('pathname').should('include', home)

    cy.get('.navItemDiv').contains('Events').click()
    cy.location('pathname').should('include', routes.events)

    cy.get('.navItemDiv').contains('Scholarships').click()
    cy.location('pathname').should('include', routes.scholarships)

    cy.get('.navItemDiv').contains('About').click()
    cy.location('pathname').should('include', routes.about)

    cy.get('.navItemDiv').contains('My MSU').click()
    cy.location('pathname').should('include', signedInUserRoutes.mymsu)

  })

  signedInUserRoutesArr.forEach(route => {
    it(`${route} - successfully loads`, () => {
      cy.visit(route)
    })

    it(`${route} - cy.go() - go back or forward in the browser\'s history`, () => {
      cy.visit(routes.default)
      cy.visit(routes.home)

      cy.visit(route)
      if (route === routes.default) {
        cy.location('pathname').should('include', route.substring(1))

        cy.go('back')
        cy.location('pathname').should('include', home)

        cy.go('forward')
        cy.location('pathname').should('include', route.substring(1))

        // clicking back
        cy.go(-1)
        cy.location('pathname').should('include', home)

        // clicking forward
        cy.go(1)
        cy.location('pathname').should('include', route.substring(1))
      } else {


        cy.location('pathname').should('include', route)

        cy.go('back')
        cy.location('pathname').should('not.include', route)

        cy.go('forward')
        cy.location('pathname').should('include', route)

        // clicking back
        cy.go(-1)
        cy.location('pathname').should('not.include', route)

        // clicking forward
        cy.go(1)
        cy.location('pathname').should('include', route)
      }
    })
  })

})
