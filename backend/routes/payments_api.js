const dbPayment = require("../config/db_payment_queries");
const dbMember = require("../config/db_member_queries")
const { checkIfAuthenticated } = require('../config/middleware/auth-middleware');
const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST);

function getMemberDueAmount(memberType) {
    let amount;
    switch (memberType) {
        case "Current Life Member Individual":
            amount = 25.00;
            break;
        case "Current Life Member Married Couple":
            amount = 45.00;
            break;
        case "Regular Non-Life Membership Individual":
            amount = 60.00;
            break;
        case "Regular Non-Life Membership Married Couple":
            amount = 115.00;
            break;
        case "Individual Life Membership Installment":
            amount = 150.00;
            break;
        case "Married Couple Life Membership Installment":
            amount = 220.00;
            break;
        default:
            throw Error("Invalid Member Type")
    }
    console.log("member type: ", memberType, amount)
    return amount;
}

function getDonationAmount(type) {
  let amount;
  switch (type) {
      case "donation15":
          amount = 15.00;
          break;
      case "donation25":
          amount = 25.00;
          break;
      case "donation50":
          amount = 50.00;
          break;
      case "donation100":
          amount = 100.00;
          break;
      case "donation250":
          amount = 250.00;
          break;
      case "donation500":
          amount = 500.00;
          break;
      case "donation1000":
          amount = 1000;
          break;
      default:
          throw Error("Invalid Donation Amout")
  }
  console.log(type, amount)
  return amount;
}

module.exports = function (app) {
    app.post("/api/payDues", checkIfAuthenticated, function (req, res) {
        console.log("Pay Dues")
        // console.log(req.body)
        const memberType = req.body.memberType
        const MemberId = req.body.memberId
        const uid = req.uid
        const paymentObj = {
            amount: getMemberDueAmount(memberType),
            description: memberType,
            currency: 'usd',
            uid,
            MemberId,
        }
        return dbPayment.makePayment(paymentObj)
            .then(function (result1) {
                // console.log(result1.dataValues)
                dbMember.updateMember(uid, { memberType })
                    .then(function (result2) {
                        console.log(result2)
                        return res.status(200).json([result1, result2]);
                    })
            });;
    })

    app.get("/api/myPayments", checkIfAuthenticated, function (req, res) {
        console.log("Get My Payment History")
        return dbPayment.getPayments(req.uid)
            .then(function (result) {
                // console.log(result.dataValues)
                res.status(200).json(result);
            });
    })

    app.post("/api/makeDonation", checkIfAuthenticated, function (req, res) {
      console.log("Make Donation")
      // console.log(req.body)
      const donationType = req.body.donationType
      const MemberId = req.body.memberId
      const uid = req.uid
      const amount = getDonationAmount(donationType)
      const paymentObj = {
          amount: amount,
          description: "Donated $" + amount + " for Scholarships",
          currency: 'usd',
          uid,
          MemberId,
      }
      return dbPayment.makePayment(paymentObj)
      .then(function (result) {
        res.status(200).json(result);
    });
  })

  app.post("/api/makeStripePayment", checkIfAuthenticated, function (req, res) {
    console.log("Make Stripe Payment")
    // console.log(req.body)
    const donationType = req.body.donationType
    const MemberId = req.body.memberId
    const uid = req.uid
    const amount = getDonationAmount(donationType)
    const description = "Donated $" + amount + " for Scholarships"
    let paymentObj = {
        name: "Scholarship Donation",
        amount: amount,
        description: "Donated $" + amount + " for Scholarships",
        currency: 'usd',
    }
    return stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      metadata:{
        uid,
        MemberId,
      },
      line_items: [{...paymentObj, quantity: 1}],
      success_url: 'https://example.com/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'https://example.com/cancel',
    })
    .then(function (result) {
      console.log(result)
      const dbPaymentObj = {
        ...paymentObj,
        uid,
        MemberId,
      }
      console.log(dbPaymentObj)
      return dbPayment.makePayment(dbPaymentObj)
      .then(dbResult =>{
        console.log(dbResult);
        res.status(200).json(result);
      }).catch((err) => {
        console.log(err)
        throw err;
      })
    })
    .catch((err) => {
      console.log(err)
      throw err
    })

  })

  app.post("/api/makeAnonymousDonation", function (req, res) {
    console.log("Make Anonymous Donation")
    // console.log(req.body)
    const donationType = req.body.donationType
    const MemberId = req.body.memberId
    const uid = "Anonymous"
    const amount = getDonationAmount(donationType)
    const paymentObj = {
        amount: amount,
        description: "Donated $" + amount + " for Scholarships",
        currency: 'usd',
        uid,
        MemberId,
    }
    return dbPayment.makePayment(paymentObj)
    .then(function (result) {
      res.status(200).json(result);
  });
})

}
