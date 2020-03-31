import React from "react";
import { Link } from "react-router-dom";

import Button from "../Button";
import SignoutButton from "../../components/SignOut";
import * as ROUTES from "../../constants/routes";

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
          <div className="dropdown loginBtnDiv">
            <button
              className="btn dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img
                src={authUser.providerData[0].photoURL}
                height="40px"
                width="40px"
                alt="profile"
                className="navPhoto"
              ></img>
            </button>

            <div className="dropdown-menu">
              <Link to={ROUTES.HOME}>
                <SignoutButton className="signoutBtn">LOGOUT</SignoutButton>
              </Link>

              <Link to={ROUTES.MYMSU} className="myMSUlink">
                <p className="myMSUlink">My Msu</p>
              </Link>
            </div>
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
  );
};

export default TopNavBar;
