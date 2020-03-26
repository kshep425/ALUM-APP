const db = require("../../config/db_queries");
const {checkIfAuthenticated, checkIfAdmin} = require('../../config/middleware/auth-middleware');

module.exports = function (app) {
  app.post("/api/user", function (req, res) {
    return db
      .createMember(req.body)
      .then(function (result) {
        res.status(200).json(result.dataValues);
      })
      .catch(function (err) {
        return err;
      });
  });

  app.get("/api/users", function (req, res) {
    console.log("Get all members")
    return db.getAllMembers()
      .then(function (result) {
        console.log(result)
        res.status(200).json(result);
      });
  });

  app.get("/api/user/", checkIfAuthenticated, function (req, res) {
    console.log("Get User")
    return db.getMember(req.authId)
      .then(function (result) {
        res.status(200).json(result);
      });
  });

  app.post("/api/updateUser", checkIfAuthenticated, function (req, res) {
    console.log("Update User")
    return db.updateMember(req.authId, req.body)
      .then(function (result) {
        res.status(200).json(result);
      });
  });

  app.post("/api/setUserRole", checkIfAdmin, function(req,res){
    console.log("Set User Role")
    console.log(req.body);
    return db.updateMember(req.uid, {role: req.body.role})
  });
};
