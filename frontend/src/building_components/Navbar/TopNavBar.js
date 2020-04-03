import React from "react";
import { Link } from "react-router-dom";

import Button from "../Button";
import SignoutButton from "../../components/SignOut";
import * as ROUTES from "../../constants/routes";

import { AuthUserContext } from "../../components/Session";

const TopNavBar = () => (
  <div className="navbar mr-auto">
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

          <div className="dropdown">
            <button
              className="btn dropdown-toggle navDropdown"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fa fa-bars"></i>
            </button>

            <div className="dropdown-menu ">
              <Link to={ROUTES.HOME} className="dropdownLink">
                <p className="myMSUlink">HOME</p>
              </Link>
              <Link to={ROUTES.SCHOLARSHIPS} className="dropdownLink">
                <p className="myMSUlink">SCHOLARSHIPS</p>
              </Link>
              <Link to={ROUTES.EVENTS} className="dropdownLink">
                <p className="myMSUlink">EVENTS</p>
              </Link>
              <Link to={ROUTES.ABOUT} className="dropdownLink">
                <p className="myMSUlink">ABOUT</p>
              </Link>
            </div>
          </div>
          <div>
            <h1 className="alumniText topNavBarText">Morgan State University Howard County Alumni Chapter</h1>

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
