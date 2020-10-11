import React, { useRef, useState } from "react";
import DonationType from "./DonationType";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes"
import Button from "../BuildingComponents/Button"
import { AuthUserContext } from "../Session";
import API from "../../utils/API"
import get from "lodash/get"

import * as ROLES from "../../constants/roles"
import Paypal from "../FormComponents/Paypal";
import { DONATIONS } from "../../constants/donations";

const MakeDonation = (props) => {
  const donationTypeRef = useRef();
  const [checkout, setCheckout] = useState(false);
  const [payPalObj, setPayPalObj] = useState({});
  const [anonymous, setAnonymous] = useState(false)

  let memberId;
  let token;

  function handleSubmit(event) {
    event.preventDefault()

    const paymentObj = {
      donationType: get(donationTypeRef, "current.attributes.value.value"),
      memberId
    }

    if (paymentObj.donationType && token) {
      const amount = DONATIONS[paymentObj.donationType].amount;
      const type = DONATIONS[paymentObj.donationType].type;
      setPayPalObj({
        type,
        amount,
        description: "Donated $" + amount + " for Scholarships",
        currency: 'usd',
      })
      setCheckout(true)
      API.makeDonation(paymentObj, token)
        .then(() => {

        })
        .catch((err) => {
          // console.log(err);
          alert("There was an issue with your payment, please try again")
        })

    } else if (paymentObj.donationType) {
      const anonymousUID = "Anonymous"

      API.addNewUser({
        uid: anonymousUID,
        fullName: anonymous,
        email: "kshep425@gmail.com",
        role: ROLES.USER
      })
        .then(result => {
          paymentObj.memberId = get(result, "data.id") || 2
          const amount = DONATIONS[paymentObj.donationType].amount;
          const type = DONATIONS[paymentObj.donationType].type;
          setAnonymous(true);
          setPayPalObj({
            type,
            amount,
            description: "Donated $" + amount + " for Scholarships",
            currency: 'usd',
          })
          setCheckout(true)
          API.makeAnonymousDonation(paymentObj)
            .then(() => {
              // alert("Thank you for your donation!")
            })
            .catch((err) => {
              // console.log(err);
              alert("There was an issue with your payment, please try again")
            })
        })

    }
    else {
      alert("Please select a payment type")
    }
  }
  return (
    <AuthUserContext.Consumer>
      {authUser => {
        memberId = get(authUser, 'members.id')
        token = get(authUser, 'token')
        return (
          <div>
            {checkout
              ? <Paypal payment={payPalObj} anonymous={anonymous}/>
              : <>
                <p>We raise scholarship money for new and continuing MSU students from Howard County</p>
                <DonationType donationTypeRef={donationTypeRef} />
                <Button onClick={handleSubmit}>Make Donation</Button>
                <Link to={ROUTES.MYMSU}><Button>Cancel</Button></Link>
              </>
            }
          </div>
        )
      }}
    </AuthUserContext.Consumer>
  );
};

export default MakeDonation;