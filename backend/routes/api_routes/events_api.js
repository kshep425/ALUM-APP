const db = require("../../config/db_event_queries");
const { checkIfAuthenticated } = require('../../config/middleware/auth-middleware');

module.exports = function(app) {
  app.post("/api/events", function(req, res) {
    console.log("REQ BODY IS BELOW FOR EVENTS************");
    //console.log(req.body);
    return db
      .createEvent(req.body)
      .then(function(result) {
        console.log("EVENTS RES.DATAVALUES BELOW!  /api/events post");
        // console.log(result.dataValues);
        res.status(200).json(result.dataValues);
      })
      .catch(function(err) {
        return err;
      });
  });

  app.get("/api/events", function(req, res) {
    return db.getAllEvents().then(function(dbPost) {
      console.log("DBPOST BELOW!! for /api/events");
      console.log(dbPost.dataValues);
      res.json(dbPost);
    });
  });

  app.get("/api/event/:id/members", function(req, res) {
    eventId = req.params.id;
    return db
      .getAllEventMembers(eventId)
      .then(function(result) {
        console.log("EVENTS RES BELOW! for /api/event/:id/members");
        //console.log(result);
        res.status(200).json(result);
      })
      .catch(function(err) {
        return err;
      });
  });

  app.post("/api/newEventRSVP", checkIfAuthenticated, function(req, res) {
    console.log("Add Member to Event with RSVP")
    // console.log(req.body)
    req.body["uid"] = req.uid
    return db.addEventRSVP(req.body)
    .then(function(result) {
      // console.log(result);
      res.status(200).json(result);
    })
    .catch(function(err) {
      return err;
    });;
  });

  app.get("/api/myEvents", checkIfAuthenticated, function(req, res) {
    console.log("Get My Events");
    // console.log(req.uid);
    return db.myEvents(req.uid)
    .then(function(result) {
      res.status(200).json(result);
    })
    .catch(function(err) {
      return err;
    });

  })
};
