/**
 * withAuthorization.js
 * The withAuthorization higher-order component is used to shield the authorization business logic from your components. It can be used on any component that needs to be protected with authorization (e.g. home page, account page).
 *
 * https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial
 */

import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const withAuthorization = condition => Component => {

  class WithAuthorization extends React.Component {
    componentDidMount() {
      this.listener = this.props.firebase.onAuthUserListener(
        authUser => {
          // route user to home page if they don't meet the conditions.
          if (!condition(authUser)) {
            this.props.history.push(ROUTES.HOME);
          }
        },
        () => this.props.history.push(ROUTES.HOME),
      );
    }

    componentWillUnmount() {
      this.listener();
    }
    // This context is needed to avoid showing the protected page before the redirect happens.
    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser =>
            condition(authUser) ? <Component {...this.props} /> : null
          }
        </AuthUserContext.Consumer>
      );
    }
  }

  return compose(
    withRouter,
    withFirebase,
  )(WithAuthorization);
};

export default withAuthorization;
