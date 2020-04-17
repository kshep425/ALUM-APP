const SIGN_IN_METHODS = {
  PASSWORD: {
    id: "password",
    name: "Password",
    provider: null
  },
  GOOGLE: {
    id: "google.com",
    name: "Google",
    provider: "googleProvider",
    icon: "fa fa-google"
  },
  FACEBOOK: {
    id: "facebook.com",
    name: "Facebook",
    provider: "facebookProvider",
    icon: "fa fa-facebook-square"
  },
  TWITTER: {
    id: "twitter.com",
    name: "Twitter",
    provider: "twitterProvider",
    icon: "fa fa-twitter"
  }
};

export default SIGN_IN_METHODS;
