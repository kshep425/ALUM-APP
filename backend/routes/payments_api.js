const dbPayment = require("../config/db_payment_queries");
const dbMember = require("../config/db_member_queries")
const { checkIfAuthenticated } = require('../config/middleware/auth-middleware');
const DONATIONCATEGORIES = require("../constants/donationCategories");

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
    case "Individual Life Membership Full Payment":
      amount = 500.00;
      break;
    case "Married Couple Life Membership Full Payment":
      amount =700.00;
      break;
    case "Friend of Morgan Membership":
      amount = 25.00;
      break;
    default:
      throw Error("Invalid Member Type")
  }
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

function getFee(amount, type) {
  return (amount < 500) || (type === "membership") ? parseFloat((((parseFloat(amount) + .3) / .971) - amount).toFixed(2)) : 0;
}

module.exports = function (app) {
  app.post("/api/payDues", checkIfAuthenticated, function (req, res) {
    console.log("Pay Dues")
    const memberType = req.body.type
    const MemberId = req.body.memberId
    const uid = req.uid
    const categoryId = req.body.categoryId;
    const amount = getMemberDueAmount(memberType)
    const fee = getFee(amount, categoryId)
    const paypalOrderId = req.body.paypalOrderId;
    const paypalPayerId = req.body.paypalPayerId;
    const otherMemberName = req.body.otherMemberName;
    const otherMemberEmail = req.body.otherMemberEmail;

    const paymentObj = {
      amount,
      description: memberType,
      currency: 'usd',
      uid,
      MemberId,
      fee,
      paypalPayerId,
      paypalOrderId,
      otherMemberName,
      otherMemberEmail,
      categoryId,
    }

    console.log("paymentObj: ", paymentObj)

    return dbPayment.makePayment(paymentObj)
      .then(function (result1) {
        // console.log(result1.dataValues)
        dbMember.updateMember(uid, { memberType, spouseName: otherMemberName, spouseEmail: otherMemberEmail })
          .then(function (result2) {
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

    const donationType = req.body.type
    const MemberId = req.body.memberId
    const uid = req.uid
    const categoryId = req.body.categoryId;
    const amount = getDonationAmount(donationType)
    const fee = getFee(amount, categoryId)
    const comment = req.body.comment;
    const paypalOrderId = req.body.paypalOrderId;
    const paypalPayerId = req.body.paypalPayerId;

    const paymentObj = {
      amount: amount,
      currency: 'usd',
      description: `$${amount.toFixed(2)} Donation for ${DONATIONCATEGORIES.find(x => x.id === categoryId).categoryName}`,
      uid,
      comment,
      paypalPayerId,
      paypalOrderId,
      MemberId,
      fee,
      categoryId,
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
    const donationType = req.body.type
    const MemberId = req.body.memberId
    const uid = "Anonymous"
    const categoryId = req.body.categoryId;
    const amount = getDonationAmount(donationType)
    const fee = getFee(amount, categoryId)
    const comment = req.body.comment;
    const paypalOrderId = req.body.paypalOrderId;
    const paypalPayerId = req.body.paypalPayerId;
    const paymentObj = {
      amount: amount,
      description: `$${amount} Donation for ${DONATIONCATEGORIES.find(x => x.id === categoryId).categoryName}`,
      currency: 'usd',
      uid,
      comment,
      paypalPayerId,
      paypalOrderId,
      MemberId,
      fee,
      categoryId,
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
