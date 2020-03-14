/**
 * If a user is authenticated, store it in the local state and pass the authenticated user object down to all components that are interested in it. Otherwise, pass the authenticated user down as null. That way, all components interested in it can adjust their behavior (e.g. use conditional rendering) based on the session state.
 *
 */



import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp/index';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: null,
    };
  }

  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged( authUser =>
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null })
    );
  };

  componentWillUnmount() {
    this.listener();
  }

  render() {
    return (
  <Router>
    <div>
      <Navigation authUser={this.state.authUser} />
      <hr />
      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
      <Route path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route path={ROUTES.ADMIN} component={AdminPage} />
    </div>
  </Router>
)}};

export default withFirebase(App);