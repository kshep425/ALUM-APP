const db = require("../../config/db_queries");

module.exports = function(app) {
  app.post("/api/user", function(req, res) {
    console.log("REQ BODY IS BELOW FOR USERS************");
    console.log(req.body);
    return db
      .createMember(req.body)
      .then(function(result) {
        console.log("EVENTS RES.DATAVALUES BELOW!");
        console.log(result.dataValues);
        res.status(200).json(result.dataValues);
      })
      .catch(function(err) {
        return err;
      });
  });

  app.get("/api/users", function(req, res) {
    console.log("getAllMembers");
    return db.getAllMembers()
      .then(function(result) {
      console.log("DBPOST BELOW!!");
      console.log(result);
      res.status(200).json(dbPost);
    });
  });
};
