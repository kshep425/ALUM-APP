const routes = {
  default: '/',
  home: '/home',
  events: '/events',
  scholarships: '/scholarships',
  about: '/about',
  signin: '/signin',
  signup: '/signup',
  forgotPassword: 'pw-forget',
  donate: '/donate'
}

const noRoute = {
  admin: '/admin',
  mymsu: '/mymsu',
  edit: '/edit',
  editMemberInfo: '/editMemberInfo',
  payMembershipDues: '/payMembershipDues',
}

const unknownPath = '/unknownPath';

const routesArr = Object.values(routes)
const noRouteArr = Object.values(noRoute)
const home = routes.home.substring(1)

describe('Not Logged In Routes Spec', () => {

  it(`${unknownPath} - redirects to home`, () => {
    cy.visit(unknownPath)
    cy.location('pathname').should('include', unknownPath)
    cy.get('.navItemDiv').should('contain', 'Home')
    cy.get('.navItemDiv').should('contain', 'Events')
    cy.get('.navItemDiv').should('contain', 'Scholarships')
    cy.get('.navItemDiv').should('contain', 'About')
    cy.get('.navItemDiv').should('not.contain', 'My MSU')
    cy.get('.slick-slider')
  })

  noRouteArr.forEach(route => {
    it(`${route} - redirects to home`, () => {
      cy.visit(route)
      cy.location('pathname').should('include', home)
    })
  })

  it(`${routes.home} - .click() - click on a DOM element`, () => {
    // https://on.cypress.io/click
    cy.visit(routes.default)
    cy.get('.navItemDiv').should('contain', 'Home')
    cy.get('.navItemDiv').should('contain', 'Events')
    cy.get('.navItemDiv').should('contain', 'Scholarships')
    cy.get('.navItemDiv').should('contain', 'About')
    cy.get('.navItemDiv').should('not.contain', 'My MSU')
    cy.get('.slick-slider')

    cy.get('.navItemDiv').contains('Home').click()
    cy.location('pathname').should('include', home)

    cy.get('.navItemDiv').contains('Events').click()
    cy.location('pathname').should('include', routes.events)

    cy.get('.navItemDiv').contains('Scholarships').click()
    cy.location('pathname').should('include', routes.scholarships)

    cy.get('.navItemDiv').contains('About').click()
    cy.location('pathname').should('include', routes.about)
  })

  routesArr.forEach(route => {
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


    it(`${route} - cy.reload() - reload the page`, () => {
      // https://on.cypress.io/reload
      cy.visit(route)
      cy.reload()

      // reload the page without using the cache
      cy.reload(true)
    })
  })
})
