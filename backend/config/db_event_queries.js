const db = require("../models");

const eventQueries = {
  createEvent: function(reqBody) {
    let [request, fields] = this.formatRequest(reqBody);
    return db.Event.create(request, fields);
  },

  formatRequest: function(reqBody) {
    let fields = { options: { fields: [] } };
    let request = {
      title: reqBody.title,
      description: reqBody.description,
      startDate: reqBody.startDate,
      endDate: reqBody.endDate,
      type: reqBody.type,
      address: reqBody.address,
      venueName: reqBody.venueName,
      ticketType: reqBody.ticketType,
      hostName: reqBody.hostName,
      creatorId: reqBody.creatorId,
      hostEmail: reqBody.hostEmail,
    };

    Object.keys(request).forEach(key => {
      if (!request[key]) {
        delete request[key];
      } else {
        fields.options.fields.push(key);
      }
    });

    return [request, fields];
  },

  findEvent: function(eventId) {
    return db.Event.findOne({ id: eventId });
  },

  //   updateEvent: function(updateRequest, eventId) {
  //     return db.Event.update(request, { where: { id: eventId } });
  //   },

  //   deleteEvent: function(eventId) {
  //     return db.Event.destroy({ id: eventId });
  //   },

  getAllEvents: function() {
    return db.Event.findAll({});
  }
};

module.exports = eventQueries;
