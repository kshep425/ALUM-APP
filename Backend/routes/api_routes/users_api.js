const db = require("../../config/db_queries");
const admin = require('firebase-admin');

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

  app.post("/api/update", function (req, res) {
    return db.updateMember(req.body.uid, req.body)
      .then(function (result) {
        res.status(200).json(result);
      });
  });
};

function listAllUsers(nextPageToken) {
  // List batch of users, 1000 at a time.
  admin.auth().listUsers(1000, nextPageToken)
    .then(function (listUsersResult) {
      listUsersResult.users.forEach(function (userRecord) {
        console.log('user', userRecord.toJSON());
      });
      if (listUsersResult.pageToken) {
        // List next batch of users.
        listAllUsers(listUsersResult.pageToken);
      }
    })
    .catch(function (error) {
      console.log('Error listing users:', error);
    });
}
