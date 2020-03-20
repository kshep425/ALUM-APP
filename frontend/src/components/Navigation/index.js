import React from 'react';
import { Link } from 'react-router-dom';

// use AuthUserContext.Consumer to determine if the user has been authenticated (a.k.a. they logged in).  That will determine the nav routes they can go to.
import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

const Navigation = () => {
  console.log("Navigation - are you an authUser?")

  return (
  <AuthUserContext.Consumer>
    {
      authUser => {
        console.log(authUser)
        return authUser ? (
          <NavigationAuth authUser={authUser} />
          ) : (
          <NavigationNonAuth />
        )
      }
    }
  </AuthUserContext.Consumer>
)};

const NavigationAuth = ({ authUser }) => (
  <ul>
    <li>
      <Link to={ROUTES.HOME}>Home</Link>
    </li>
    <li>
      <Link to={ROUTES.DONATE}>Donate</Link>
    </li>
    <li>
      <Link to={ROUTES.MYMSU}>MyMSU</Link>
    </li>
    <li>
      <Link to={ROUTES.EVENTS}>Events</Link>
    </li>
    {console.log(authUser.roles)}
    {!!authUser.roles[ROLES.ADMIN] && (
      <>
      <li>
        <Link to={ROUTES.ACCOUNTS}>Accounts</Link>
      </li>
      <li>
        <Link to={ROUTES.ADMIN}>Admin</Link>
      </li>
      </>
    )}
    {!!authUser.roles[ROLES.BOARD] && (
      <li>
        <Link to={ROUTES.ACCOUNTS}>Accounts</Link>
      </li>
    )}
    <li>
      <SignOutButton />
    </li>
  </ul>
);

const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to={ROUTES.HOME}>Home</Link>
    </li>
    <li>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
    <li>
      <Link to={ROUTES.EVENTS}>Events</Link>
    </li>
    <li>
      <Link to={ROUTES.DONATE}>Donate</Link>
    </li>
  </ul>
);


export default Navigation;
