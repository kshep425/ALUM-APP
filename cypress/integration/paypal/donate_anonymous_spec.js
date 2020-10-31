const { default: routes } = require("../../fixtures/constants");

describe("Anonymous Donation", () => {

  beforeEach(() => {
    cy.visit(routes.donate)
  })

  it("displays donation instructions", () => {
    cy.get("h2")
      .should(($l) => {
        cy.log($l)
        // return an array of texts from all of the instruction labels's
        const texts = $l.map((i, el) => Cypress.$(el).text())

        // jquery map returns jquery object
        // and .get() convert this to simple array
        const labels = texts.get()

        // array should have length of 3
        expect(labels, 'has 2 labels').to.have.length(2)
        cy.log(labels)
        // use second argument to expect(...) to provide clear
        // message with each assertion
        // expect(labels, 'has expected text in each label').to.deep.eq([
        //   'Select a donation campaign',
        // ])
        // // 'Select donation amount',
        // // 'Enter Amount',

      })
  })
})
// Display Campaign Tests (Add different date formats)
// console.log("null dates: ", displayDonationCampaign(null, null)) // true
// console.log("sd < cd, ed null: ", displayDonationCampaign("January 1, 2020", null)) // true
// console.log("sd > cd, ed null: ", displayDonationCampaign("November 1, 2020", null)) // false
// console.log("sd < cd, ed < cd: ", displayDonationCampaign("January 1, 2020", "January 1, 2020")) // false
// console.log("sd > cd, ed > cd: ", displayDonationCampaign("November 1, 2020", "November 1, 2021")) //false
// console.log("sd null, ed < cd: ", displayDonationCampaign(null, "January 1, 2020")) // false
// console.log("sd null, ed > cd: ", displayDonationCampaign(null, "November 1, 2021")) // true
// console.log("sd < cd, ed > cd: ", displayDonationCampaign("January 1, 2020", "January 1, 2021")) // true
// console.log("sd > cd, ed < cd: ", displayDonationCampaign("November 1, 2020", "November 1, 2021")) // false

  // it("displays donation amounts", () => {

  // })

  // it("displays a donation comment", () => {

  // })

  // it("displays text input donation amount", () => {

  // })

  // it("throws error if donation campaign is not selected", () => {

  // })

  // it("throws error if donation amount is not selected or entered", () => {

  // })

  // it("throws error if other donation amount is not a number", () => {

  // })

  // it("allows user to enter a comment", () => {

  // })

  // it("allows user to associate donation on behalf of a member", () => {

  // })

  // it("allows user to make a donation without comment", () => {

  // })

  // // success opens paypal page, when paypal button is clicked, paypal opens, payment is made in paypal,
  // // anonymous user is created, payment is stored in database under anonymous user
  // // success page is displayed
  // it("allows user to make a donation with comment", () => {

  // })

  // it("allows user to make a donation on behalf of someone else without comment", () => {

  // })

  // it("allows user to make a donation on behalf of someone else with comment", () => {

  // })

  // it("displays fee with total cost of donation < $500", () => {

  // })

  // it("no fee is applied for donation >= $500", () => {

  // })
