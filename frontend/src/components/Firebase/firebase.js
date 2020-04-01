import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
// import { getDisplayName } from 'recompose';
import API from '../../utils/API'

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    /* Helper */

    this.serverValue = app.database.ServerValue;
    this.emailAuthProvider = app.auth.EmailAuthProvider;

    /* Firebase APIs */

    this.auth = app.auth();
    this.db = app.database();

    /* Social Sign In Method Provider */

    this.googleProvider = new app.auth.GoogleAuthProvider();
    this.facebookProvider = new app.auth.FacebookAuthProvider();
    this.twitterProvider = new app.auth.TwitterAuthProvider();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignInWithGoogle = () =>
    this.auth.signInWithPopup(this.googleProvider);

  doSignInWithFacebook = () =>
    this.auth.signInWithPopup(this.facebookProvider);

  doSignInWithTwitter = () =>
    this.auth.signInWithPopup(this.twitterProvider);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
    });

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  // *** Merge Auth and DB User API *** //

  onAuthUserListener = async (next, fallback) =>
    this.auth.onAuthStateChanged(async authUser => {
      if (authUser) {
        // Get User Token
        this.auth.currentUser.getIdToken(/* forceRefresh */ true)
        .then((token) =>{
          // Get User Info from members, degrees, and payments table
          Promise.all([API.getUser(token), API.getUserDegrees(token), API.myPayments(token), API.myEvents(token)])
          .then(result => {
            console.log(result)
            let [members, degrees, payments, events] = result;
              // add table data to authUser for use in myMSU and Events Pages.
              authUser = {
                uid: authUser.uid,
                email: authUser.email,
                emailVerified: authUser.emailVerified,
                providerData: authUser.providerData,
                members: members.data || {},
                degrees: degrees.data,
                payments: payments.data,
                events: events.data,
                token
              };
              next(authUser);
          })
        })
      } else {
        fallback();
      }
    });

  // *** User API ***

  // user = uid => this.db.ref(`users/${uid}`);

  users = () => API.getAllUsers();

  // *** Message API ***

  // message = uid => this.db.ref(`messages/${uid}`);

  // messages = () => this.db.ref('messages');
}

export default Firebase;
