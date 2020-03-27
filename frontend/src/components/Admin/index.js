import React, { useState, useEffect } from 'react';
import { compose } from 'recompose';
import { withAuthorization, withEmailVerification } from '../Session';
import * as ROLES from '../../constants/roles';
import API from '../../utils/API'
import get from 'lodash/get';

const AdminPage = () => {
  const [users, setUsers] = useState({ users: [] })

  const getAllUsers = async () => {
    console.log("Get all users")
    API.getAllUsers()
      .then((result) => {
        setUsers({ users: result.data })
      });
  }

  useEffect(() => {
    getAllUsers()
  }, [])

  const setUserRole = (uid, role) => {
    API.setUserRole({uid, role}, token);
  }

  const displayUsers = (users) => {
    console.log("Display Users");
    return (
      users.users.map((user) =>
        <li key={user.uid}>{user.uid}: {user.username}, {user.firstName} {user.lastName} {user.role}
          <input type="radio" id="user" name="role" className="" value="USER" onChange={() => {setUserRole(user.uid, "USER")}} defaultChecked={(user.role === "USER")}/>
            <label htmlFor="user">USER</label>
          <input type="radio" id="user" name="role" className="" value="BOARD" onChange={() => {setUserRole(user.uid, "BOARD")}}defaultChecked={(user.role === "BOARD")}/>
            <label htmlFor="user">BOARD</label>
          <input type="radio" id="user" name="role" className="" value="ADMIN" onChange={() => {setUserRole(user.uid, "ADMIN")}} defaultChecked={(user.role === "ADMIN")}/>
            <label htmlFor="user">ADMIN</label>
        </li>
      ))
  }

  return (
    <div>
      <h1>Admin</h1>
      <p>The Admin Page is accessible by every signed in admin user.</p>
      <h1>Users</h1>
      <ul>{displayUsers(users)}</ul>
    </div>
  );
}

let token;

const condition = authUser => {
  token = authUser.token
  console.log(get(authUser, 'db.role'))
  return authUser && !!authUser.db.role === ROLES.ADMIN;
}

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(AdminPage);
