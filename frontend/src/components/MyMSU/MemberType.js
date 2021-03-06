import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

const MemberType = props => {

  function getMemberType() {
    if (props.authUser.members.memberType) {
      return <p>{props.authUser.members.memberType}</p>;
    } else {
      return (
        <div>
          <Link to={ROUTES.PAY_DUES}>
            <button className="submitButton">Pay Membership Dues</button>
          </Link>
        </div>
      );
    }
  }

  return (
    <div className="container-sm contactInfoDiv">
      <strong>Member Type </strong>
      {getMemberType()}
    </div>
  );
};

export default MemberType;
