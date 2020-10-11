import React from "react";
import Navitem from "./NavItem";
import * as ROUTES from "../../../constants/routes";
import Logo from "../Logo";
import { AuthUserContext } from "../../Session";

const LowerNav = () => (
  <div className="container lowerNav">
    <div className="row navRow">
      <Logo />
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
      return authUser ? <Navitem href={ROUTES.MYMSU}>My MSU</Navitem> : <></>;
    }}
  </AuthUserContext.Consumer>
);

export default LowerNav;
