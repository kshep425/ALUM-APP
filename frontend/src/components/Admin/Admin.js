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
        (!!user.uid && user.uid !== "Anonymous")
        ? <li key={user.uid}>
            {user.uid}: {user.username}, {user.firstName} {user.lastName} {user.role}
            <input
              id={`role${user.uid}`}
              type="radio"
              name={`role${user.uid}`}
              className=""
              value="USER"
              onChange={() => {setUserRole(user.uid, "USER")}}
              defaultChecked={(user.role === "USER")}
            />
            <label htmlFor={`role${user.uid}`}>USER</label>
          <input
            id={`role${user.uid}`}
            name={`role${user.uid}`}
            type="radio"
            className=""
            value="BOARD"
            onChange={() => {setUserRole(user.uid, "BOARD")}}
            defaultChecked={(user.role === "BOARD")}
          />
            <label htmlFor={`role${user.uid}`}>BOARD</label>
          <input
            id={`role${user.uid}`}
            type="radio"
            name={`role${user.uid}`}
            className=""
            value="ADMIN"
            onChange={() => {setUserRole(user.uid, "ADMIN")}}
            defaultChecked={(user.role === "ADMIN")}
          />
            <label htmlFor={`role${user.uid}`}>ADMIN</label>
        </li>
        : null
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
  token = get(authUser, 'token')
  const role = get(authUser, 'members.role')
  return authUser && role === ROLES.ADMIN;
}


export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(AdminPage);
