import React, { useRef, useState } from "react";
import DonationType from "./DonationType";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import Button from "../BuildingComponents/Button";
import { AuthUserContext } from "../Session";
import API from "../../utils/API";
import get from "lodash/get";

import * as ROLES from "../../constants/roles";
import Paypal from "../FormComponents/Paypal";

const MakeDonation = (props) => {
  const donationTypeRef = useRef();
  const [checkout, setCheckout] = useState(false);
  const [payPalObj, setPayPalObj] = useState({});
  const [anonymous, setAnonymous] = useState(false);
  const [paymentObj, setPaymentObj] = useState({});
  let memberId;
  let token;

  /**
   * handleSubmit - takes the entered donation and opens the paypal buttons page to process payment for the donation
   * @param {*} event
   */
  function handleSubmit(event) {
    event.preventDefault();

    let donationType = get(donationTypeRef, "current.attributes.value.value");

    setPaymentObj({
      donationType: donationType,
      memberId
    });

    if (paymentObj.donationType && token) {
      const amount = donationType.replace(/^\D+/g, '');
      const type = "donation";

      setPayPalObj({
        type,
        amount,
        description: "Donated $" + amount + " for Scholarships",
        currency: 'usd',
      });

      setCheckout(true);

    } else if (paymentObj.donationType) {
      const anonymousUID = "Anonymous";

      API.addNewUser({
        uid: anonymousUID,
        fullName: anonymous,
        email: "kshep425@gmail.com",
        role: ROLES.USER
      })
        .then(result => {
          setPaymentObj({
            ...paymentObj,
            memberId: get(result, "data.id") || 2
          });

          const amount = donationType.replace(/^\D+/g, '');
          const type = "donation";

          setAnonymous(true);

          setPayPalObj({
            type,
            amount,
            description: "Donated $" + amount + " for Scholarships",
            currency: 'usd',
          });

          setCheckout(true);

        })

    }
    else {
      alert("Please select a payment type");
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
              ? <Paypal payment={payPalObj} anonymous={anonymous} memberId={memberId} token={token} paymentObj={paymentObj} />
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