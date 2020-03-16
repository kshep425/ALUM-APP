import React from 'react';
import { compose } from 'recompose';

import { withAuthorization } from '../Session';
import Messages from '../Messages';

const HomePage = () => (
  <div>
    <h1>Home Page</h1>
    <p>The Home Page is accessible by every signed in user.</p>

    <Messages />
  </div>
);

// conditional statement to see if the user is authorized or not. authUser returns a user if logged in, and returns null if the user is not logged in.
const condition = authUser => authUser != null;

export default compose(
  withAuthorization(condition),
)(HomePage);
