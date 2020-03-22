const db = require("../../config/db_queries");

module.exports = function(app) {
  app.post("/api/user", function(req, res) {
    return db
      .createMember(req.body)
      .then(function(result) {
        res.status(200).json(result.dataValues);
      })
      .catch(function(err) {
        return err;
      });
  });

  app.get("/api/users", function(req, res) {
    return db.getAllMembers()
      .then(function(result) {
      res.status(200).json(dbPost);
    });
  });

  app.get("/api/user/:id", function(req, res) {
    return db.getMember(req.params.id)
      .then(function(result) {
      res.status(200).json(result);
    });
  });

  app.post("/api/update/:uid", function(req, res){
    return db.updateMember(req.params.uid, req.body).then(function(result) {
      res.status(200).json(result);
    });
  })
};
