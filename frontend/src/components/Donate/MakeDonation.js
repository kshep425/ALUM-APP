import React, { useRef } from "react";
import DonationType from "./DonationType";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes"
import Button from "../../building_components/Button"
import { AuthUserContext } from "../Session";
import API from "../../utils/API"
import get from "lodash/get"
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm'
var stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC);

const MakeDonation = (props) => {
  console.log(props)
  const donationTypeRef = useRef();
  let memberId;
  let token;

  function handleSubmit(event) {
    event.preventDefault()
    console.log("Make Payment")
    const paymentObj = {
      donationType: get(donationTypeRef, "current.attributes.value.value"),
      memberId
    }
    console.log(paymentObj)
    if (paymentObj.donationType) {
      API.makeDonation(paymentObj, token)
      .then((result) =>{
        console.log(result)
        alert("You have made a donation!")  ;
      })
      .catch((err) => {
        console.log(err)
        alert("There was an issue paying your dues, please try again")
      })

    }
    else {
      alert("Please select a payment type")
    }
  }
  return (
    <Elements stripe={stripePromise}>
    <AuthUserContext.Consumer>
      {authUser => {
        memberId = authUser.members.id
        token = authUser.token
        return (
          <div>
            <p>We raise scholarship money for new and continuing MSU students from Howard County</p>
            <DonationType donationTypeRef={donationTypeRef}  />
            <CheckoutForm />
            <Link to={ROUTES.MYMSU}><Button>Cancel</Button></Link>
            <Button onClick={handleSubmit}>Make Donation</Button>
          </div>
        )
      }}
    </AuthUserContext.Consumer>
    </Elements>
  );
};

export default MakeDonation;