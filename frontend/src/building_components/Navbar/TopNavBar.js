import React from "react";
import { Link } from "react-router-dom";

import Button from "../Button";
import SignoutButton from "../../components/SignOut";
import * as ROUTES from "../../constants/routes"

import { AuthUserContext } from "../../components/Session";

const TopNavBar = () => (
  <div className="navbar">
    <LogInOrOutBtn />
    <DonateBtn />
  </div>
);

const LogInOrOutBtn = () => (
  <AuthUserContext.Consumer>
    {authUser => {
      return authUser ? (
        <>
          <div className="loginBtnDiv">
            <Link to={ROUTES.HOME}>
              <SignoutButton>LOGOUT</SignoutButton>
            </Link>
            <Link to={ROUTES.HOME}>
              <Button className="btn btn-secondary registerBtn">Home</Button>
            </Link>
            <Link to={ROUTES.MYMSU}>
              <Button className="btn btn-secondary registerBtn">MY MSU</Button>
            </Link>
          </div>
        </>
      ) : (
        <Link to={ROUTES.SIGN_IN}>
          <Button className="btn btn-secondary loginBtn">LOGIN</Button>
        </Link>
      );
    }}
  </AuthUserContext.Consumer>
);


const DonateBtn = () => {
  return (
    <Link to={ROUTES.DONATE}>
      <button className="btn btn-success donateBtn">GIVE</button>
    </Link>
  )
}


export default TopNavBar;
