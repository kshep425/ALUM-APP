import React, {Component} from 'react';
import * as ROUTES from '../../constants/routes';
import {FirebaseContext, withFirebase} from '../Firebase';
import {Link, withRouter} from 'react-router-dom'

/**
 * Find the tutorial used to create this here:
 * https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial
 */


const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    <FirebaseContext.Consumer>
      {firebase => <SignUpForm firebase={firebase} />}
    </FirebaseContext.Consumer>
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
    const { username, email, passwordOne } = this.state;
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
const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpPage;

export { SignUpForm, SignUpLink };