import { get } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { DONATIONCATEGORIES } from '../../constants/donationCategories';
import { MEMBERSHIPS } from '../../constants/memberships';
import * as ROUTES from "../../constants/routes";
import API from "../../utils/API"
import Button from '../BuildingComponents/Button';
import MakeDonation from '../Donate/MakeDonation';

/** Create a payment object based on type that returns amount, fee, totalAmount, and description
 * @params type can be a donationType example: donation200 for $200 or a membership type that we can get the amount and description from the MEMBERSHIPS
 * */
function Payment(type, categoryId=null) {
  if (type.includes("donation")) {
    this.amount = type.replace(/^\D+/g, '')
    this.description = `$${this.amount} Donation for ${DONATIONCATEGORIES.find(x => x.id === categoryId).categoryName}`
  } else {
    this.amount = MEMBERSHIPS[type].amount;
    this.description = MEMBERSHIPS[type].description;
  }
  // fees only apply to less than $500 or if the category Id is membership
  const applyFee = (this.amount < 500) || categoryId === "membership"
  this.totalAmount =  (applyFee) ? ((parseFloat(this.amount) + .3) / .971).toFixed(2) : this.amount;
  this.fee = (applyFee) ? (this.totalAmount - this.amount).toFixed(2) : 0;
}

/**Paypal
 * This will open the payal interface and allow a user to make a payment based on the information submitted in the payment and paymentObj objects.
 * @params props contains
 * @params token {string} used for accessing the database and submitting a payment for the user
 * @params type  Contains the donation type ex 'donation100' is a $100.00 donation used when making a submission to the database or membership type from MEMBERSHIPS constant to get amount and description
 * @params dbPayment {object} contains
 *    memberId {string} memberId of logged in user used for the database
 *    categoryId {string} This will say what donation campaign the payment is for, or if it's a membership
 *    type {string} type of donation or membership
 *    comment {string} comment entered by user
 *    otherUserName {string} the member's name the payment is linked to
 *    otherUserEmail {string} the member's email the payment is linked to
 */
function Paypal(props) {
  const { dbPayment, token } = props
  const payment = new Payment(dbPayment.type, dbPayment.categoryId);

  const [success, setSuccess] = useState(false);
  const paypal = useRef();

  const paypalDescriptionLength = 127;
  const description = `${payment.description} ${dbPayment.comment || ""} ${dbPayment.otherMemberName || ""} ${dbPayment.otherMemberEmail || ""}`;
  const paypalDescription = (description.length > 123) ? description.substring(0,paypalDescriptionLength) + "..." : description;

  useEffect(() => {
    if (!dbPayment) {
      dbPaymentExists(dbPayment)
      return
    }

    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          // submit order to paypal
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: paypalDescription,
                amount: {
                  value: payment.totalAmount,
                  currency_code: "USD",
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          await actions.order.capture();
          // add donation to database
          dbPayment["paypalOrderId"] = data.orderID
          dbPayment["paypalPayerId"] = data.payerID

          API.makePayment(dbPayment, token)
            .then((result) => {
              setSuccess(true)
            })
            .catch((err) => {
              // console.log(err);
              alert("There was an issue with your payment, please try again")
            })
        },
        onError: (err) => {
          // console.log(err);
          alert("There was an issue with your payment, please try again")
        },
      })
      .render(paypal.current);
  }, []);

  function dbPaymentExists (dbPaymentObj) {
    // if dbPayment does not exist display MakeDonation Page
    if (dbPaymentObj === undefined) {
      return <div> <Link className="donationCancelButton" to={ROUTES.DONATE}><Button>Go To Make Donation Page</Button></Link>
      {/* <MakeDonation checkout={false}></MakeDonation> */}
      </div>
    }

    return ( <div>
      {get(dbPayment, "type") && (get(dbPayment, "type").includes("donation"))
            ? <p>Please complete your {get(payment, "description")} + ${get(payment, "fee")} fee for a total of ${get(payment, "totalAmount")} using PayPal</p>
            : <p>Please complete your ${get(payment, "amount")} payment for {get(payment, "description")} + ${get(payment, "fee")} fee using PayPal</p>
          }

          <div ref={paypal}></div>
    </div>
    )
  }

  return (
    <div>
      {success
        ? <div>
          <p>Thank you for your {get(payment, "description")} payment!</p>
          {!!token
            ? <p>Go to <Link to={ROUTES.MYMSU}>My MSU Page</Link> to view payment history.</p>
            : null
          }
        </div>
        : dbPaymentExists(dbPayment)

      }
    </div>
  );
}

export default Paypal;