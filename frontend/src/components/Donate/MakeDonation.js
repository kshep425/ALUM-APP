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
  const donationInfoRef = useRef();
  const [checkout, setCheckout] = useState(false);
  const [dbPayment, setDbPayment] = useState();
  let memberId;
  let token;

  /**
   * handleSubmit - takes the entered donation and opens the paypal buttons page to process payment for the donation
   * @param {*} event
   */
  function handleSubmit(event) {
    event.preventDefault();

    const comment = get(donationInfoRef, "current.attributes.donationcomment.value")
    const type = get(donationInfoRef, "current.attributes.donationtype.value")
    const categoryId = get(donationInfoRef, "current.attributes.donationcategoryid.value")

    if (!!type & !!categoryId & !!token) {
      setDbPayment({
        categoryId,
        type,
        comment,
        memberId,
      })
      setCheckout(true);
    } else if (!!type & !!categoryId) {
      const anonymousUID = "Anonymous";

      API.addNewUser({
        uid: anonymousUID,
        fullName: "Anonymous Donor",
        email: "kshep425@gmail.com",
        role: ROLES.USER
      })
        .then(result => {
          memberId = get(result, "data.id") || 2
          setDbPayment({
            categoryId,
            type,
            comment,
            memberId,
          })
          setCheckout(true);
        })

    }
    else {
      alert("Please select donation campaign and donation amount.");
    }
  }
  return (
    <AuthUserContext.Consumer>
      {authUser => {
        memberId = get(authUser, 'members.id')
        token = get(authUser, 'token')
        return (
          <div className="donateContainer">
            {checkout
              ? <Paypal
                dbPayment={dbPayment}
                memberId={memberId}
                token={token}
              />
              : <>
                <h1 className="donateHeader blueText">Providing scholarships for Howard County's new and current <span className="orangeText">MSU students</span></h1>
                <DonationType donationInfoRef={donationInfoRef} />
                <Button className="donationSubmitButton" onClick={handleSubmit}>Donate</Button>
                {/* <Link className="donationCancelButton" to={ROUTES.MYMSU}><Button>Cancel</Button></Link> */}
              </>
            }
          </div>
        )
      }}
    </AuthUserContext.Consumer>
  );
};

export default MakeDonation;