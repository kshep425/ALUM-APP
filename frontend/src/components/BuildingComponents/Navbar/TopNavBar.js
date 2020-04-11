import React from "react";
import { Link } from "react-router-dom";

import Button from "../Button";
import SignoutButton from "../../SignOut";
import * as ROUTES from "../../../constants/routes";
import MediaNavitem from "./MediaNavitem";
import { AuthUserContext } from "../../Session";

const TopNavBar = () => (
  <div className="navbar">
    <LogInOrOutBtn />
    <div className="testDiv">
      <MediaNavitem href={ROUTES.HOME}>Home</MediaNavitem>
      <MediaNavitem href={ROUTES.EVENTS}>Events</MediaNavitem>
      <MediaNavitem href={ROUTES.SCHOLARSHIPS}>Scholarships</MediaNavitem>
      <MediaNavitem href={ROUTES.ABOUT}>About</MediaNavitem>
    </div>
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
              <Link to={ROUTES.MYMSU} className="dropdownLink">
                <p className="myMSUlink">My Msu</p>
              </Link>
              <Link to={ROUTES.MYMSU} className="dropdownLink">
                <p className="myMSUlink">Change Password</p>
              </Link>
              <Link to={ROUTES.HOME}>
                <SignoutButton className="signoutBtn">LOGOUT</SignoutButton>
              </Link>
            </div>
          </div>

          <div className="alumniTextDiv" >
            <h1 className="alumniText topNavBarText">
              Morgan State University Howard County Alumni Chapter
            </h1>
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
      <button className="btn btn-success donateBtn">DONATE</button>
    </Link>
  );
};

export default TopNavBar;
