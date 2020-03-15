import React from 'react';
import { AuthUserContext } from '../Session';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';

const AccountPage = () => (
<AuthUserContext.Consumer>
    {authUser => (
      <div>
        <h1>Account: {(authUser)? authUser.email : 'no email provided'}</h1>
        <PasswordForgetForm />
        <PasswordChangeForm />
      </div>
    )}
  </AuthUserContext.Consumer>
)

export default AccountPage;