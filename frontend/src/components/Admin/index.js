import React, { useState, useEffect } from 'react';
// import { Switch, Route } from 'react-router-dom';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';
// import { UserList, UserItem } from '../Users';
import * as ROLES from '../../constants/roles';
// import * as ROUTES from '../../constants/routes';
import API from '../../utils/API'
// import get from 'lodash/get';

const AdminPage = () => {
  const [users, setUsers] = useState({ users: [] })

  const getAllUsers = async () => {
    console.log("Get all users")
    API.getAllUsers()
      .then((result) => {
        console.log(result.data)
        setUsers({ users: result.data })
      });
  }

  useEffect(() => {
    getAllUsers()
  }, [])

  const displayUsers = (users) => {
    console.log("Display Users");
    return (
      users.users.map((user) =>
        <li key={user.id}>{user.id}: {user.username}, {user.firstName} {user.lastName}</li>
      ))
  }

  return (
    <div>
      <h1>Admin</h1>
      <p>The Admin Page is accessible by every signed in admin user.</p>
      <h1>Users</h1>
      <ul>{displayUsers(users)}</ul>
      {/* <Switch>
        <Route exact path={ROUTES.ADMIN_DETAILS} component={UserItem} />
        <Route exact path={ROUTES.ADMIN} component={UserList} />
      </Switch> */}
    </div>
  );
}

const condition = authUser =>
  authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(AdminPage);
