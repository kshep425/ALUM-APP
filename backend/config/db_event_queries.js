const db = require("../models");

const eventQueries = {
  createEvent: function (reqBody) {
    let [request, fields] = this.formatRequest(reqBody);
    return db.event.create(request, fields);
  },

  formatRequest: function (reqBody) {
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

  // findEvent: function(eventId) {
  //   return db.event.findOne({ id: eventId });
  // },

  //   updateEvent: function(updateRequest, eventId) {
  //     return db.event.update(request, { where: { id: eventId } });
  //   },

  //   deleteEvent: function(eventId) {
  //     return db.event.destroy({ id: eventId });
  //   },

  getAllEvents: function () {
    return db.event.findAll({});
  },

  getAllEventMembers: function (eventId) {
    return db.event.findOne({ id: eventId })
      .then(function (result) {
        return result.getMembers();
      });
  },

  /**
   *
   * @param {*} eventRSVP {MemberId, eventId, rsvp, uid}
   */
  addEventRSVP: function (eventRSVP) {
    console.log("Add Event RSVP")
    return db.event_members.create({ eventId: eventRSVP.eventId, MemberId: eventRSVP.MemberId, rsvp: eventRSVP.rsvp, uid: eventRSVP.uid })
      .then((result) => {
        //console.log(result);
        return result;
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  },

  getUserEvents: function (uid) {
    console.log("Get my events")
    return db.Member.findAll({
      where: { uid: uid },
      include: [{
        model: db.event
      }]
    })
      .then((events) => {
        const memberEventRSVPs = Object.assign([],
          events[0].dataValues.events.map((e) => {
            return {
              eventId: e.dataValues.id,
              title: e.dataValues.title,
              description: e.dataValues.description,
              startDate: e.dataValues.startDate,
              endDate: e.dataValues.endDate,
              type: e.dataValues.type,
              address: e.dataValues.address,
              venueName: e.dataValues.venueName,
              ticketType: e.dataValues.ticketType,
              rsvp: e.dataValues.event_members.rsvp
            }
          })
        )
        return memberEventRSVPs;
      })
  }
};

module.exports = eventQueries;
