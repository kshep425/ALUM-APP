import React from "react";
import { AuthUserContext } from "../Session";
import { Link } from "react-router-dom";
import { EDIT } from "../../constants/routes";

const ContactInfo = () => {
  return (
    <AuthUserContext.Consumer>
      {authUser =>
        authUser.members ? (
          <div className="container-sm">
            <div className="card m-1 p-1">
              <EditLink />
              <address>
                <strong>
                  {authUser.members.prefix} {authUser.members.firstName}{" "}
                  {authUser.members.lastName} {authUser.members.suffix}
                </strong>
                <br />
                {!authUser.members.streetAddress1
                  ? null
                  : authUser.members.streetAddress1}
                {!authUser.members.streetAddress2
                  ? null
                  : authUser.members.streetAddress2}
                <br />
                {!authUser.members.city ? null : authUser.members.city},{" "}
                {!authUser.members.state ? null : authUser.members.state}{" "}
                {!authUser.members.zip ? null : authUser.members.zip}
                <br />
                {!authUser.members.phone ? null : authUser.members.phone}
                <br />
                {!authUser.members.email ? null : authUser.members.email}
              </address>
            </div>
          </div>
        ) : null
      }
    </AuthUserContext.Consumer>
  );
};

const EditLink = () => (
  <Link to={EDIT}>
    <i className="fa fa-edit"></i>
    Edit Contact Info
  </Link>
);

export default ContactInfo;
