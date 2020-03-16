const db = require("../../config/db_event_queries");

module.exports = function(app) {
  app.post("/api/events", function(req, res) {
    console.log("REQ BODY IS BELOW FOR EVENTS************");
    console.log(req.body);
    return db
      .createEvent(req.body)
      .then(function(result) {
        console.log("EVENTS RES.DATAVALUES BELOW!");
        console.log(result.dataValues);
        res.status(200).json(result.dataValues);
      })
      .catch(function(err) {
        return err;
      });
  });
};
