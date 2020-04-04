import React from "react";
import { Link } from "react-router-dom";
import { EDIT } from "../../constants/routes";
import "./mymsupage.css";

const ContactInfo = ({ authUser }) => {
  return (
    <div className="container-sm contactInfoDiv">
      <EditLink />
      <address>
        {!!authUser.members.prefix ||
        !!authUser.members.firstName ||
        !!authUser.members.lastName ||
        !!authUser.members.suffix ? (
          <>
            <strong>
              {authUser.members.prefix} {authUser.members.firstName}{" "}
              {authUser.members.lastName} {authUser.members.suffix}
            </strong>
            <br />
          </>
        ) : null}
        {authUser.members.streetAddress1 || authUser.members.streetAddress2 ? (
          <>
            {authUser.members.streetAddress1}
            {authUser.members.streetAddress2 || null}
            <br />
          </>
        ) : null}
        {authUser.members.city ? <>{authUser.members.city}, </> : null}
        {authUser.members.state ? <>{authUser.members.state} </> : null}
        {authUser.members.zip ? (
          <>
            {authUser.members.zip}
            <br />
          </>
        ) : null}

        {authUser.members.phone ? (
          <>
            {authUser.members.phone}
            <br />
          </>
        ) : null}
        {authUser.members.email}
      </address>
    </div>
  );
};

const EditLink = () => (
  <Link to={EDIT}>
    <i className="fa fa-edit"></i>
    Edit Contact Info
  </Link>
);

export default ContactInfo;
