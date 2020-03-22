import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'recompose';

import { withAuthUserContext, withAuthorization, withEmailVerification, AuthUserContext } from '../Session';
import { UserList, UserItem } from '../Users';
import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';


const AdminPage = () => (
  <AuthUserContext.Consumer>
    {
      authUser =>
      <div>
    <h1>Admin</h1>
    <p>The Admin Page is accessible by every signed in admin user.</p>
    <p>Current user role:</p>
      {/* <p>Admin: {authUser.roles.ADMIN}</p>
      <p>BOARD: {authUser.roles.BOARD}</p>
      <p>User: {authUser.roles.USER}</p>
      {authUser.roles.map((role) => <p key={authUser.id}>{role}</p>)} */}

    <p>Select User Role</p>
    <select>
      <option value={ROLES.ADMIN}>{ROLES.ADMIN}</option>
      <option value={ROLES.BOARD}>{ROLES.BOARD}</option>
      <option value={ROLES.USER}>{ROLES.USER}</option>
    </select>
    <input></input>
    <Switch>
      <Route exact path={ROUTES.ADMIN_DETAILS} component={UserItem} />
      <Route exact path={ROUTES.ADMIN} component={UserList} />
    </Switch>
  </div>
    }
  </AuthUserContext.Consumer>
);

const condition = authUser =>
  authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(AdminPage);
