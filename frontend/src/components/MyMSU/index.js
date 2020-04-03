import React, { Component } from "react";
import { compose } from "recompose";
import "./mymsupage.css";
import "../../pages/style.css";
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from '../Session';
import { withFirebase } from '../Firebase';
import PasswordChangeForm from '../PasswordChange';
import ContactInfo from './ContactInfo'
import MemberInfo from './MemberInfo'
import MemberType from './MemberType.js'
import PaymentHistory from './PaymentHistory'
import EventHistory from './EventHistory'
import Footer from "../../building_components/Footer/Footer";


const SIGN_IN_METHODS = [
  {
    id: "password",
    name: "Password",
    provider: null
  },
  {
    id: "google.com",
    name: "Google",
    provider: "googleProvider",
    icon: "fa fa-google"
  },
  {
    id: "facebook.com",
    name: "Facebook",
    provider: "facebookProvider",
    icon: "fa fa-facebook-square"
  },
  {
    id: "twitter.com",
    name: "Twitter",
    provider: "twitterProvider",
    icon: "fa fa-twitter"
  }
];

const MyMsuPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div className="mainPage">
        <div className="eventPageDiv">
          <h1>
            <strong>My MSU</strong>
          </h1>

          <p>View and edit your member information.</p>

          <LoginManagement authUser={authUser} />
          <hr className="lineDivider" />
          <div className="row">
            <div className="col-md-4">
              {!!authUser.providerData[0].photoURL && (
                <img
                  src={authUser.providerData[0].photoURL}
                  width="200"
                  height="200"
                  className="profPic"
                  alt="profile"
                ></img>
              )}
              <h4>
                <strong>{authUser.providerData[0].displayName}</strong>
              </h4>
              {!!authUser.providerData[0].Email && (
                <h6>
                  <i class="fa fa-envelope"> </i>
                  {" " + authUser.providerData[0].Email}
                </h6>
              )}
              <h6>
                <i class="fa fa-envelope"> </i>
                {" " + authUser.email}
              </h6>
              {!!authUser.providerData[0].phoneNumber && (
                <h6>{authUser.providerData[0].phoneNumber}</h6>
              )}
              <ContactInfo authUser={authUser} />
              <MemberInfo authUser={authUser} />
              <MemberType authUser={authUser} />
            </div>

            <div className="col-md-8">
              <PaymentHistory authUser={authUser} />
              <EventHistory authUser={authUser} />
              <PasswordChangeForm />
            </div>
          </div>
        </div>
      </div>
    )}
  </AuthUserContext.Consumer>
);

class LoginManagementBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSignInMethods: [],
      error: null
    };
  }

  componentDidMount() {
    this.fetchSignInMethods();
  }

  fetchSignInMethods = () => {
    this.props.firebase.auth
      .fetchSignInMethodsForEmail(this.props.authUser.email)
      .then(activeSignInMethods =>
        this.setState({ activeSignInMethods, error: null })
      )
      .catch(error => this.setState({ error }));
  };

  onSocialLoginLink = provider => {
    this.props.firebase.auth.currentUser
      .linkWithPopup(this.props.firebase[provider])
      .then(this.fetchSignInMethods)
      .catch(error => this.setState({ error }));
  };

  onDefaultLoginLink = password => {
    const credential = this.props.firebase.emailAuthProvider.credential(
      this.props.authUser.email,
      password
    );

    this.props.firebase.auth.currentUser
      .linkAndRetrieveDataWithCredential(credential)
      .then(this.fetchSignInMethods)
      .catch(error => this.setState({ error }));
  };

  onUnlink = providerId => {
    this.props.firebase.auth.currentUser
      .unlink(providerId)
      .then(this.fetchSignInMethods)
      .catch(error => this.setState({ error }));
  };

  render() {
    const { activeSignInMethods, error } = this.state;

    return (
      <div>
        <h6>
          <strong>Change Login Methods:</strong>
        </h6>
        {SIGN_IN_METHODS.map(signInMethod => {
          console.log(signInMethod);
          const onlyOneLeft = activeSignInMethods.length === 1;
          const isEnabled = activeSignInMethods.includes(signInMethod.id);

          return (
            <p key={signInMethod.id} className="signInMethodsBtns">
              {signInMethod.id === "password" ? (
                <DefaultLoginToggle
                  onlyOneLeft={onlyOneLeft}
                  isEnabled={isEnabled}
                  signInMethod={signInMethod}
                  onLink={this.onDefaultLoginLink}
                  onUnlink={this.onUnlink}
                />
              ) : (
                <SocialLoginToggle
                  onlyOneLeft={onlyOneLeft}
                  isEnabled={isEnabled}
                  signInMethod={signInMethod}
                  onLink={this.onSocialLoginLink}
                  onUnlink={this.onUnlink}
                />
              )}
            </p>
          );
        })}
        {error && error.message}
      </div>
    );
  }
}

const SocialLoginToggle = ({
  onlyOneLeft,
  isEnabled,
  signInMethod,
  onLink,
  onUnlink
}) =>
  isEnabled ? (
    <button
      type="button"
      className="btn btn-primary addEventBtn"
      onClick={() => onUnlink(signInMethod.id)}
      disabled={onlyOneLeft}
    >
      Deactivate {signInMethod.name} <i className={signInMethod.icon}></i>
    </button>
  ) : (
    <button
      className="btn btn-primary addEventBtn"
      type="button"
      onClick={() => onLink(signInMethod.provider)}
    >
      Link {signInMethod.name} <i className={signInMethod.icon}></i>
    </button>
  );

class DefaultLoginToggle extends Component {
  constructor(props) {
    super(props);

    this.state = { passwordOne: "", passwordTwo: "" };
  }

  onSubmit = event => {
    event.preventDefault();

    this.props.onLink(this.state.passwordOne);
    this.setState({ passwordOne: "", passwordTwo: "" });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { onlyOneLeft, isEnabled, signInMethod, onUnlink } = this.props;

    const { passwordOne, passwordTwo } = this.state;

    const isInvalid = passwordOne !== passwordTwo || passwordOne === "";

    return isEnabled ? (
      <button
        type="button"
        className="btn btn-primary addEventBtn"
        onClick={() => onUnlink(signInMethod.id)}
        disabled={onlyOneLeft}
      >
        Deactivate {signInMethod.name} <i className={signInMethod.icon}></i>
      </button>
    ) : (
      <form onSubmit={this.onSubmit}>
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="New Password"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm New Password"
        />

        <button disabled={isInvalid} type="submit">
          Link {signInMethod.name} <i className={signInMethod.icon}></i>
        </button>
      </form>
    );
  }
}

const LoginManagement = withFirebase(LoginManagementBase);

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(MyMsuPage);
