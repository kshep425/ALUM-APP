const db = require("../models");

const eventQueries = {
  createEvent: function(reqBody) {
    let [request, fields] = this.formatRequest(reqBody);

    request = {
      title: "fgfdgdggfd",
      description: "fdfgdg",
      startDate: "2020-03-18T15:45",
      endDate: "2020-03-28T04:05"
    };

    fields = {
      options: { fields: ["title", "description", "startDate", "endDate"] }
    };

    return db.Event.create(request, fields);
  },

  formatRequest: function(reqBody) {
    let fields = { options: { fields: [] } };

    console.log("Create Member Called");
    let request = {
      title: reqBody.title,
      description: reqBody.description,
      startDate: reqBody.startDate,
      endDate: reqBody.endDate
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
  //   findEvent: function(eventId) {
  //     return db.Event.findOne({ id: eventId });
  //   },

  //   updateEvent: function(updateRequest, eventId) {
  //     return db.Event.update(request, { where: { id: eventId } });
  //   },

  //   deleteEvent: function(eventId) {
  //     return db.Event.destroy({ id: eventId });
  //   },

  getAllEvents: function() {
    return db.Event.find();
  }
};

module.exports = eventQueries;
