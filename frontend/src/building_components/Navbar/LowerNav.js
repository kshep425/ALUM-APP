
import React from 'react';
import Navitem from "./NavItem";
import * as ROUTES from '../../constants/routes';

import { AuthUserContext } from '../../components/Session';

const LowerNav = () => (
  <div className="lowerNav">
    <div className="row navRow">
      <Navitem href={ROUTES.EVENTS}>events</Navitem>
      <Navitem href={ROUTES.ABOUT}>about</Navitem>
      <Navitem href={ROUTES.SCHOLARSHIPS}>Scholarships</Navitem>
      <MyMsuLink />
  </div>
</div>
)

const MyMsuLink = () => (
  <AuthUserContext.Consumer>
    {
      authUser => {
        console.log(authUser)
        return authUser
        ? (
          <Navitem href={ROUTES.MYMSU}>my msu</Navitem>
        )
        : (<></>)
      }
    }
  </AuthUserContext.Consumer>
);

export default LowerNav;