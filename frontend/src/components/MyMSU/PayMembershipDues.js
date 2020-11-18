import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AuthUserContext, withAuthorization } from "../Session";
import { MemberTypeForm } from "../FormComponents";
import * as ROUTES from "../../constants/routes";
import Button from "../BuildingComponents/Button";
import get from "lodash/get";
import { compose } from "recompose";
import Paypal from "../FormComponents/Paypal";

const PayMembershipDues = () => {
  const memberTypeRef = useRef();
  const [checkout, setCheckout] = useState(false);
  const [dbPayment, setDbPayment] = useState("");
  let memberId;
  let token;

  function handleSubmit(event) {
    event.preventDefault();
    const memberType = get(memberTypeRef, "current.attributes.value.value");
    let spouseName;
    let spouseEmail;
    let emailIsValid;

    if(!memberType){
      setCheckout(false);
      alert("Please select a membership type");
      return;
    }

    if(memberType.includes("Married")) {
      spouseName = get(memberTypeRef, "current.attributes.spousename.value");
      spouseEmail = get(memberTypeRef, "current.attributes.spouseemail.value");
      emailIsValid = get(memberTypeRef, "current.attributes.isvalidemail.value");

      // if spouseName or spouseEmail are null alert
      if (!spouseName || !spouseEmail) {
        alert("Please enter spouse name and email");
        return;
      };

      if (emailIsValid === "false" || spouseEmail.length <= 5) {
        alert("Please enter a valid email");
        return;
      }
    }

    setDbPayment({
      memberId,
      categoryId: "membership",
      type: memberType,
      otherMemberName: spouseName,
      otherMemberEmail: spouseEmail,
    })

    if (memberType) {
      setCheckout(true);
    }
  }

  return (
    <AuthUserContext.Consumer>
      {authUser => {
        memberId = authUser.members.id
        token = authUser.token
        return (
          <div className="membershipDuesContainer">
            <h1>Pay Membership Dues</h1>
            {checkout
            ? <Paypal dbPayment={dbPayment} token={token} />
            : <div>
              <MemberTypeForm memberTypeRef={memberTypeRef} />
              <Button className="submitButton" onClick={handleSubmit}>Make Payment</Button>
              <Link to={ROUTES.MYMSU}><Button className="cancelButton">Cancel</Button></Link>

            </div>
          }
          </div>
        )
      }}
    </AuthUserContext.Consumer>
  )
}

const condition = authUser => !!authUser;

export default compose(
  withAuthorization(condition)
    (PayMembershipDues));