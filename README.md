# Morgan State University Howard County - Alumni App

## Description
This website Morgan State University Alumni Association Howard County Chapters website to learn about upcoming events, scholarship information, pay dues, make donations, and promote new initiatives.

The program was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Table of Contents
* [Requirements](#Requirements)
* [Install for development](#Install)
* [Set up Dev Environment](#Setup)
* [Available NPM Scripts](#Available-Scripts)
* [Test](#Test)
* [Deployment Steps](#Deployment-Steps)

## Requirements
The high level requirements for the site are
* Allow users to:
  * Pay dues
  * Make donations
  * Sign up for events
  * Apply for scholarships
* Allow executive board members to:
  * View/Edit/Add/Delete events and event signup information
* Allow admins to:
  * Do everything users and executive board members can do
  * View/Edit/Add/Delete users
  * View/Edit/Add/Delete user payments


## Install
1.  Download project files
    `git clone <repo-url`
1.  Install Dependencies
    `npm install`

## Setup
### Setup Dev Environment
1.  Create a .env file in the top level directory.  Get the .env template file from a contributing developer
    `code .env` if using VS Code
    `touch .env`
1.  Create a cypress.env.json file in /cypress/fixtures directory.  Add a password to the file to use with login tests:
     `{"password": "[input a password]"}`

1.  To run this project you need a Paypal Developer account.
You can sign up [here](https://developer.paypal.com/). Afterwards you will need to plug your keys into a .env file that needs to be created as well.

// backend/.env

## Available-Scripts


## Test
First start the test server:
`npm start`

To run test run:
`npx cypress open`



## Deployment-Steps


## Contributors


## License
