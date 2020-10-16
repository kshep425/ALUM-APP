import { get } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from "../../constants/routes";
import API from "../../utils/API"

/**Paypal
 * This will open the payal interface and allow a user to make a payment based on the information submitted in the payment and paymentObj objects.
 * props contains
 * token {string} used for accessing the database and submitting a payment for the user
 * paymentObj {{donationType, memberId}} Contains the donation type ex 'donation100' is a $100.00 donation used when making a submission to the database
 * payment {description, amount} includes the description of the payment and the amount of the payment for example description could be '$100 Scholarship Donation'
 * anonymous {boolean} set true when a user has not logged in
 * memberId {string} memberId of logged in user used for the database.
 */
function Paypal(props) {
  const { payment, anonymous, token, memberId, paymentObj } = props
  const [success, setSuccess] = useState(false);
  const paypal = useRef();
  const amount = parseFloat(get(payment, "amount")).toFixed(2)

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          // submit order to paypal
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: payment.description,
                amount: {
                  currency_code: "USD",
                  value: amount,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          await actions.order.capture();
          // add donation to database
          const orderId = data.orderID;
          const payerId = data.payerID;
          if (anonymous) {
            // console.log("Make anonymous donation")
            API.makeAnonymousDonation(paymentObj)
              .then((result) => {
                setSuccess(true)
              })
              .catch((err) => {
                // console.log(err);
                alert("There was an issue with your payment, please try again")
              })
          } else {
            API.makeDonation(paymentObj, token)
              .then(() => {
                setSuccess(true)
              })
              .catch((err) => {
                // console.log(err);
                alert("There was an issue with your payment, please try again")
              })
          }
        },
        onError: (err) => {
          // console.log(err);
          alert("There was an issue with your payment, please try again")
        },
      })
      .render(paypal.current);
  }, [payment.amount, payment.description, paymentObj, token]);

  return (
    <div>
      {success
        ? <div>
          <p>Thank you for your ${amount} {get(payment, "type").toLowerCase() || "payment"}! </p>
          {anonymous
            ? null
            : <p>Go to <Link to={ROUTES.MYMSU}>My MSU Page</Link> to view payment history.</p>
          }

        </div>
        : <div>
          <p>Please complete your ${amount} {get(payment, "type").toLowerCase() || "payment"} using PayPal</p>
          <div ref={paypal}></div>
        </div>
      }
    </div>
  );
}

export default Paypal;