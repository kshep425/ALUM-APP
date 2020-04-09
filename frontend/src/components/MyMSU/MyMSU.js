import React, { useEffect, useRef } from "react";
import { compose } from "recompose";
import "./style.css";
import "./mymsupage.css";
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
  withAuthentication
} from "../Session";
import PasswordChangeForm from "../PasswordChange";
import ContactInfo from "./ContactInfo";
import MemberInfo from "./MemberInfo";
import MemberType from "./MemberType.js";
import PaymentHistory from "./PaymentHistory";
import EventHistory from "./EventHistory";
import LoginManagement from "../LoginManagement"


const MyMsuPage = () => {
  let paymentLengthRef = useRef(0);
  let eventsLengthRef = useRef(0)

  useEffect(() => {
    console.log(paymentLengthRef)
  }, [paymentLengthRef])

  useEffect(() => {
    console.log(eventsLengthRef)
  }, [eventsLengthRef])

  return (
  <AuthUserContext.Consumer>
    {authUser => {

      return (

      <div className="mainPage">
        <div className="eventPageDiv">
          <h1>
            <strong>My MSU</strong>
          </h1>

          <p>View and edit your member information.</p>

          <LoginManagement authUser={authUser} />
          <hr className="lineDivider" />
          <div className="row">
             <div className="col-md-4 profileDiv">
              {!!authUser.providerData[0].photoURL && (
                <img
                  src={authUser.providerData[0].photoURL}
                  width="200"
                  height="200"
                  className="profPic"
                  alt="profile"
                ></img>
              )}
              <h4>
                <strong>{authUser.providerData[0].displayName}</strong>
              </h4>
              {!!authUser.providerData[0].Email && (
                <h6>
                  <i className="fa fa-envelope"> </i>
                  {" " + authUser.providerData[0].Email}
                </h6>
              )}
              <h6>
                <i className="fa fa-envelope"> </i>
                {" " + authUser.email}
              </h6>
              {!!authUser.providerData[0].phoneNumber && (
                <h6>{authUser.providerData[0].phoneNumber}</h6>
              )}
              <ContactInfo authUser={authUser} />
              <MemberInfo authUser={authUser} />
              <MemberType authUser={authUser} />
            </div>

           <div className="col-md-8">
              <PaymentHistory authUser={authUser} paymentLength={paymentLengthRef}/>
              <EventHistory authUser={authUser} eventsLength={eventsLengthRef}/>
              <PasswordChangeForm />
            </div>
          </div>
        </div>
      </div>
    )}}
  </AuthUserContext.Consumer>
)};


const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
  withAuthentication
)(MyMsuPage);
