/**
 * https://dev.to/emeka/securing-your-express-node-js-api-with-firebase-auth-4b5f
 *
 * Ensure there is a valid firebase token in the request header.
 */
// const admin = require('firebase-service');
const admin = require('firebase-admin');
const db = require('../db_member_queries')

const getAuthToken = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    req.authToken = req.headers.authorization.split(' ')[1];
  } else {
    req.authToken = null;
  }
  next();
};


const checkIfAuthenticated = (req, res, next) => {
  console.log("Check if authenticated")

  getAuthToken(req, res, async () => {
    try {
      const { authToken } = req;
      const userInfo = await admin
        .auth()
        .verifyIdToken(authToken);
      req.uid = userInfo.uid;
      return next();
    } catch (e) {
      console.log(e)
      return res
        .status(401)
        .send({ error: 'You are not authorized to make this request' });
    }
  });
};

const setUserRole = async (req, res) => {
  const { uid, role } = req.body; // userId is the firebase uid for the user
  console.log(uid)
  console.log(role)
  getAuthToken(req, res, async () => {
    try {
      const { authToken } = req;
      const userInfo = await admin
        .auth()
        .verifyIdToken(authToken);

      if (userInfo.admin === true) {
        req.uid = userInfo.uid;
        return next();
      }

      throw new Error('unauthorized')
    } catch (e) {
      return res
        .status(401)
        .send({ error: 'You are not an admin and cannot change a role' });
    }
  });
}

const checkIfAdmin = (req, res, next) => {
  getAuthToken(req, res, async () => {
    try {
      const { authToken } = req;
      const userInfo = await admin
        .auth()
        .verifyIdToken(authToken);
      console.log(userInfo.uid)
      db.getMember(userInfo.uid)
      .then((result) =>{
        console.log(result.dataValues.role)
        if (result.dataValues.role === "ADMIN") {
          console.log("You are an admin")
          req.uid = userInfo.uid;
          return next();
        }

        throw new Error('unauthorized')
      }).catch(e  => {
        // console.log(e)
        return res
          .status(401)
          .send({ error: 'You are not authorized to make this request' });
      })

    } catch (e) {
      // console.log(e)
      return res
        .status(401)
        .send({ error: 'You are not authorized to make this request' });
    }
  });
};

module.exports = { checkIfAuthenticated, setUserRole, checkIfAdmin }