// Throwing errors based off of expressjs.com Error Handling information:
// https://expressjs.com/en/guide/error-handling.html

const db = require("../config/db_event_queries");
const { checkIfAuthenticated } = require('../config/middleware/auth-middleware');

module.exports = function(app) {
  app.post("/api/events", function(req, res) {
    console.log("Create New Event");
    return db
      .createEvent(req.body)
      .then(function(result) {
        res.status(200).json(result.dataValues);
      })
      .catch(function(err) {
        console.log(err);
        throw err;
      });
  });

  app.get("/api/events", function(req, res) {
    console.log("Get All Events");
    return db.getAllEvents().then(function(dbPost) {
      res.status(200).json(dbPost);
    })
    .catch(function(err) {
      console.log(err);
      throw err;
    });
  });

  app.get("/api/event/:id/members", function(req, res) {
    console.log("Get all event members");
    eventId = req.params.id;
    return db
      .getAllEventMembers(eventId)
      .then(function(result) {
        res.status(200).json(result);
      })
      .catch(function(err) {
        console.log(err);
        throw err;
      });
  });

  app.post("/api/newEventRSVP", checkIfAuthenticated, function(req, res) {
    console.log("Add Member to Event with RSVP")
    req.body["uid"] = req.uid
    return db.addEventRSVP(req.body)
    .then(function(result) {
      // console.log(result);
      res.status(200).json(result);
    })
    .catch(function(err) {
      console.log(err);
      throw err;
    });
  });

  app.get("/api/myEvents", checkIfAuthenticated, function(req, res) {
    console.log("Get My Events");
    // console.log(req.uid);
    return db.myEvents(req.uid)
    .then(function(result) {
      res.status(200).json(result);
    })
    .catch(function(err) {
      console.log(err);
      throw err;
    });

  })
};
