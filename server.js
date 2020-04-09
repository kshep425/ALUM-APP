// Server.js - This file is the initial starting point for the Node/Express server.

const express = require("express");
const session = require("express-session");
const admin = require('firebase-admin');
const routes = require("./backend/routes");
const db = require("./backend/models");

// Requiring dotenv for syncing variable
require("dotenv").config();

// Initialize the Firebase Admin SDK
// Added replace because of failures in heroku
admin.initializeApp({
  credential: admin.credential.cert({
    "project_id": process.env.FIREBASE_PROJECT_ID,
    "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    "client_email": process.env.FIREBASE_CLIENT_EMAIL,
  }),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

// Setting up port
const PORT = process.env.PORT || 3001;

// Creating express app and configuring middleware needed for authentication
const app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("frontend/build"));

// We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);

// Routes
require("./backend/routes/events_api")(app);
require("./backend/routes/users_api")(app);
require("./backend/routes/payments_api")(app);
// Redirect any routes that are not in the previous files to the home page.
app.use(routes)

// Syncing our sequelize models and then starting our Express app
const sync = !!JSON.parse(process.env.DB_SYNC);
db.sequelize.sync({ force: sync })
  .then(function() {
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
  });

module.exports = app;
