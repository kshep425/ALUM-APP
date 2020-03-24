/**
 * https://dev.to/emeka/securing-your-express-node-js-api-with-firebase-auth-4b5f
 *
 * Ensure there is a valid firebase token in the request header.
 */
// const admin = require('firebase-service');
const admin = require('firebase-admin');


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
      req.authId = userInfo.uid;
      return next();
    } catch (e) {
      console.log(e)
      return res
        .status(401)
        .send({ error: 'You are not authorized to make this request' });
    }
  });
};

module.exports = checkIfAuthenticated