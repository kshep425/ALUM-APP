const dbPayment = require("../config/db_payment_queries");
const dbMember = require("../config/db_member_queries")
const { checkIfAuthenticated } = require('../config/middleware/auth-middleware');

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
  if (type.includes("donation")) {
    amount = parseFloat(type.replace(/^\D+/g, ''))
    return amount;
  } else {
    throw Error("Invalid Donation Amout")
  }
}

module.exports = function (app) {
  app.post("/api/payDues", checkIfAuthenticated, function (req, res) {
    console.log("Pay Dues")

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
          .catch(err => {
            console.log(err);
            throw err;
          });
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  })

  app.get("/api/getUserPayments", checkIfAuthenticated, function (req, res) {
    console.log("Get User Payment History")

    return dbPayment.getPayments(req.uid)
      .then(function (result) {
        res.status(200).json(result);
      })
      .catch(err => {
        console.log(err);
        throw err;
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
      description: "Donated $" + amount.toFixed(2) + " for Scholarships",
      currency: 'usd',
      uid,
      MemberId,
    }
    return dbPayment.makePayment(paymentObj)
      .then(function (result) {
        res.status(200).json(result);
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  })

  app.post("/api/makeAnonymousDonation", function (req, res) {
    console.log("Make Anonymous Donation")
    const donationType = req.body.donationType
    const MemberId = req.body.memberId
    const uid = "Anonymous"
    const amount = getDonationAmount(donationType)
    const paymentObj = {
      amount: amount,
      description: "Donated $" + amount.toFixed(2) + " for Scholarships",
      currency: 'usd',
      uid,
      MemberId,
    }
    return dbPayment.makePayment(paymentObj)
      .then(function (result) {
        res.status(200).json(result);
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  })
}
