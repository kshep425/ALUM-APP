const db = require("../models");

const db_event_queries = {
  /**
   * makePayment
   * @param {*} data should contain paymentDate, amount, currency, description, uid, MemberId
   */
  makePayment: function (data){
    return db.Payment.create(data)
  },

  getPayments: function(uid){
    return db.Payment.findAll({where: {uid}})
  }

};

module.exports = db_event_queries;
