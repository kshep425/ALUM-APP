import React from "react";
import Navitem from "./NavItem";
import * as ROUTES from "../../constants/routes";
import Logo from "../Logo"
import { AuthUserContext } from "../../components/Session";

const LowerNav = () => (
  <div className="row">
    <div className="col-6 col-sm-4">
      <Logo />
    </div>
    <div className="col-6 col-sm-8 navRow">
      <Navitem href={ROUTES.HOME}>Home</Navitem>
      <Navitem href={ROUTES.EVENTS}>Events</Navitem>
      <Navitem href={ROUTES.SCHOLARSHIPS}>Scholarships</Navitem>
      <Navitem href={ROUTES.ABOUT}>About</Navitem>
      <MyMsuLink />
    </div>
  </div>

);

const MyMsuLink = () => (
  <AuthUserContext.Consumer>
    {authUser => {
      // console.log(authUser)
      return authUser ? <Navitem href={ROUTES.MYMSU}>my msu</Navitem> : <></>;
    }}
  </AuthUserContext.Consumer>
);

export default LowerNav;
