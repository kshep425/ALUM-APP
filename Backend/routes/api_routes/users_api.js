const db = require("../../config/db_queries");
const admin = require('firebase-admin');
const checkIfAuthenticated = require('../../config/middleware/auth-middleware');

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
    // listAllUsers();
    return db.getAllMembers()
      .then(function (result) {
        res.status(200).json(result);
      });
  });

  app.get("/api/user/:uid", function (req, res) {
    console.log("Get User by UID")
    console.log(req.params.uid)
    return db.getMember(req.params.uid)
      .then(function (result) {
        res.status(200).json(result);
      });
  });

  app.post("/api/updateUser", checkIfAuthenticated, function (req, res) {
    return db.updateMember(req.authId, req.body)
      .then(function (result) {
        res.status(200).json(result);
      });
  })
};
