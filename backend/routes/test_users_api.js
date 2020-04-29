const admin = require('firebase-admin');
const db = require('../config/db_member_queries')
let user_index = Math.floor(Math.random() * 100000 + 1)
module.exports = function (app) {
  app.post("/api/test/user", function (req, res) {
    user_index += 1;
    console.log(`create test user ${user_index}`);
    const fullName = req.body.fullName || `Test Full Name ${user_index}`;
    const email = req.body.email || `testEmail${user_index}@email.com`;
    const role = req.body.role || 'USER'
    const password = req.body.password || process.env.PASSWORD;
    return admin.auth().createUser({
      email,
      emailVerified: req.body.emailVerified || true,
      fullName,
      disabled: req.body.disabled || false,
      password,
    }).then(authUser => {
      console.log(authUser);
      console.log(authUser.uid)
      const userData = { uid: authUser.uid, fullName, email, role };
      return db.createMember(userData)
        .then(function (result) {
          console.log(result);
          return res.status(200).json(result);
        })
        .catch(function (err) {
          console.log(err);
          return err;
        });
    }).catch(err => {
      console.log(err);
      return err;
    });
  });

  app.post('/api/test/signout', function (req, res) {
    console.log("Signout")
    console.log(req)
    console.log(res)
    return admin.auth.signout()
    .then((result) => {
      console.log(result)
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      throw err;
    })

  })
}
