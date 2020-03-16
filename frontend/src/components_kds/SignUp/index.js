/**
 * Sign Up Form
 * Find the tutorial used to create this here:
 * https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial
 */
import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom'
import { compose } from 'recompose';

import {withFirebase} from '../Firebase';
import * as ROUTES from '../../constants/routes';


const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
}

/**
 * You should be able to visit the /signup route in your browser after starting your application to confirm that the form with all its input fields shows up. You should also be able to type into it (confirmation that the local state updates are working) and able to enable the submit button by providing all input fields a string (confirmation that the validation works)
 */
class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }
  onSubmit = event => {
    const { email, passwordOne } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  }
  onChange = event => {
    this.setState({[event.target.name]: event.target.value})
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    // The user is only allowed to sign up if both passwords are the same, and if the username, email and at least one password are filled with a string.
    const isInvalid =
    passwordOne !== passwordTwo ||
    passwordOne === '' ||
    email === '' ||
    username === '';


    return (
      <form onSubmit={this.onSubmit}>
      <input
        name="username"
        value={username}
        onChange={this.onChange}
        type="text"
        placeholder="Full Name"
      />
      <input
        name="email"
        value={email}
        onChange={this.onChange}
        type="text"
        placeholder="Email Address"
      />
      <input
        name="passwordOne"
        value={passwordOne}
        onChange={this.onChange}
        type="password"
        placeholder="Password"
      />
      <input
        name="passwordTwo"
        value={passwordTwo}
        onChange={this.onChange}
        type="password"
        placeholder="Confirm Password"
      />
      <button type="submit" disabled={isInvalid}>Sign Up</button>

      {error && <p>{error.message}</p>}
    </form>

    );
  }
}
const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

// To redirect a user to another page programmatically, we need access to React Router to redirect the user to another page.
// Use recompose to organize how this is called.  Since the higher-order components don't depend on each other, the order doesn't matter. Otherwise, it may be good to know that the compose function applies the higher-order components from right to left.
const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };