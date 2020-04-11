import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { AuthUserContext } from "../Session";
import { MemberTypeForm } from "../FormComponents";
import * as ROUTES from "../../constants/routes"
import API from "../../utils/API"
import Button from "../BuildingComponents/Button"
import get from "lodash/get"

const PayMembershipDues = (props) => {
  console.log(props)
  const memberTypeRef = useRef();
  let memberId;
  let token;

  function handleSubmit(event) {
    event.preventDefault()
    console.log("Make Payment")
    console.log(memberTypeRef)
    const paymentObj = {
      memberType: get(memberTypeRef, "current.attributes.value.value"),
      memberId
    }
    console.log(paymentObj)
    if (paymentObj.memberType) {
      API.payDues(paymentObj, token)
        .then((result) => {
          alert("You have paid your dues!")
          props.history.push(ROUTES.MYMSU)
        })
        .catch((err) => {
          alert("There was an issue paying your dues, please try again")
        })
    }
    else {
      alert("Please select a payment type")
    }
  }
  return (
    <AuthUserContext.Consumer>
      {authUser => {
        memberId = authUser.members.id
        token = authUser.token
        return (
          <div>
            <h1>Pay Membership Dues</h1>
            <MemberTypeForm memberTypeRef={memberTypeRef} />
            <Link to={ROUTES.MYMSU}><Button>Cancel</Button></Link>
            <Button onClick={handleSubmit}>MakePayment</Button>
          </div>
        )
      }}
    </AuthUserContext.Consumer>
  );
};

export default PayMembershipDues;