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

# How to add PayPal checkout to your React App
1. Create a Paypal Sandbox business and personal account for testing
1. Update the client id for paypal script on public/index.html page.
1. Use the youtube video to easily get started:
* [Integrate Paypal](https://www.youtube.com/watch?v=IXxEdhA7fig&t=917s)
* [How To Integrate Paypal in ReactJS](https://www.youtube.com/watch?v=IXxEdhA7fig&list=PLtOcTIK0P0rxAwWWr73jltr_inNI8UC9K&index=14)

1. From the Donate page:
   1. Select Donation Type/Amount
   1. Select Make Donation
    - This will open the paypal payment integration where you can select your shipping address and enter payment details.
1. From the Membership subscription page, follow same steps as donate.

Paypal Payment objects will require an amount and description.  Include type for our own purposes.  send payment object in the props for Paypal
```
 payPalObj = {
   amount: 10
   description: "$10 Scholarship Donation"
 }
```
Send the paypal object
```
<Paypal payment={payPalObj}>
```
Example call to paypal with the created order:
```
 window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: payment.description,
                amount: {
                  currency_code: "USD",
                  value: payment.amount,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          await actions.order.capture();
          setSuccess(true)
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
```
Documentation for creating paypal orders is found here:  https://developer.paypal.com/docs/api/orders/v2/

TODO:
[] Include transaction ids in our database
[] Send memberID's to Paypal


## Available-Scripts


## Test
First start the test server:
`npm start`

To run test run:
`npx cypress open`



## Deployment-Steps


## Contributors


## License
