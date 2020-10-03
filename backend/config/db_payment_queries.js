const db = require("../models");

const db_payment_queries = {
  /**
   * makePayment - Adds a payment to the database for a user
   * @param {*} data should contain paymentDate, amount, currency, description, uid, MemberId
   */
  makePayment: function (data){
    return db.Payment.create(data)
  },

  /**
   * getPayments - Gets all payments for a user
   * @param {*} uid
   */
  getPayments: function(uid){
    return db.Payment.findAll({where: {uid}})
  }

};

module.exports = db_payment_queries;
