const db = require("../models");

const eventQueries = {
  createEvent: function(reqBody) {
    let [request, fields] = this.formatRequest(reqBody);
    return db.event.create(request, fields);
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
      host: reqBody.host
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
    return db.event.findOne({ id: eventId });
  },

  //   updateEvent: function(updateRequest, eventId) {
  //     return db.Event.update(request, { where: { id: eventId } });
  //   },

  //   deleteEvent: function(eventId) {
  //     return db.Event.destroy({ id: eventId });
  //   },

  getAllEvents: function() {
    return db.event.findAll({});
  },

  getAllEventMembers: function(eventId) {
    return db.event.findOne({ id: eventId }).then(function(result) {
      return result.getMembers();
    });
  },

  //get all events that member is attending
  getAllMemberEvents: function() {
    return db.event
      .findAll({
        include: [db.Member],
        through: { where: { rsvp: "Yes" } }
      })
      .then(data => {
        console.log(data);
      });
  },

  //when member clicks attending, add them to the event
  addMemberToEvent: function(memberId, eventId, rsvp) {
    return db.event
      .findOne({ where: { id: eventId } })
      .then(event => event.addMember(memberId, { through: { rsvp: rsvp } }));
  }
};

module.exports = eventQueries;
