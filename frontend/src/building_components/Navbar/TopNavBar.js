import React from "react";
import { Link } from "react-router-dom";

import Button from "../Button";
import SignoutButton from "../../components/SignOut";

import { AuthUserContext } from "../../components/Session";

const TopNavBar = () => (
  <div className="navbar">
    <LogInOrOutBtn />
    <button className="btn btn-success donateBtn">GIVE</button>
  </div>
);

const LogInOrOutBtn = () => (
  <AuthUserContext.Consumer>
    {authUser => {
      return authUser ? (
        <>
          <div className="loginBtnDiv">
            <Link to="/">
              <SignoutButton>LOGOUT</SignoutButton>
            </Link>
            <Link to="/home">
              <Button className="btn btn-secondary registerBtn">Home</Button>
            </Link>
            <Link to="/mymsu">
              <Button className="btn btn-secondary registerBtn">MY MSU</Button>
            </Link>
          </div>
        </>
      ) : (
        <Link to="/signin">
          <Button className="btn btn-secondary loginBtn">LOGIN</Button>
        </Link>
      );
    }}
  </AuthUserContext.Consumer>
);

export default TopNavBar;
