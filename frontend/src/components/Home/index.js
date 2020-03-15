import React from 'react';
import { compose } from 'recompose';

import { AuthUserContext, withAuthorization, withEmailVerification } from '../Session';
import Messages from '../Messages';

const HomePage = () => (
<AuthUserContext.Consumer>
    {authUser => (
  <div>
    <h1>Home Page</h1>
    <h4>Welcome {authUser.providerData[0].displayName} </h4>
    
    <p>The Home Page is accessible by every signed in user.</p>

    <Messages />
  </div>
    )}
    </AuthUserContext.Consumer>
);

// conditional statement to see if the user is authorized or not. authUser returns a user if logged in, and returns null if the user is not logged in.
const condition = authUser => authUser != null;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(HomePage);
