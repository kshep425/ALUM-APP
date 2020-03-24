// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
const express = require("express");
const session = require("express-session");
// Requiring passport as we've configured it
var admin = require('firebase-admin');
// Initialize the default app
var admin = require('firebase-admin');
// Requiring dotenv for syncing variable
require("dotenv").config();

const fb_db_url = process.env.FIREBASE_DATABASE_URL
// Initialize the Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: fb_db_url,
});

// Sets up the Express App
// =============================================================

// Setting up port
const PORT = process.env.PORT || 3001;

// Requiring our models for syncing
const db = require("./Backend/models");

// Creating express app and configuring middleware needed for authentication
const app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("frontend/build"));

//else {
//   app.use(express.static("./frontend/public"));
// }

// We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);

// Routes
// =============================================================
//const api_routes = require("./routes/api_routes")
//app.use(api_routes);

require("./Backend/routes/api_routes/login_api_routes")(app);
require("./Backend/routes/api_routes/events")(app);
require("./Backend/routes/api_routes/users_api")(app);
// Syncing our sequelize models and then starting our Express app
// =============================================================
const sync = JSON.parse(process.env.DB_SYNC) || true;
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});

module.exports = app;
