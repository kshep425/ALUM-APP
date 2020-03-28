import React from "react";
import Button from "../../building_components/Button"
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes"
const MemberType = (props) => {
  console.log(props)

  function getMemberType() {
    if (props.authUser.db.memberType) {
      return (<p>{props.authUser.db.memberType}</p>)
    } else {
      return (
        <div>
          <Link to={ROUTES.PAY_DUES}><Button>Pay Membership Dues</Button></Link>
        </div>
      )
    }
  }

  return (
    <div className="container">
      <div className="card">
        {getMemberType()}
      </div>
    </div>
  );
};

export default MemberType;