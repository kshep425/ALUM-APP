import app from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
}

class Firebase {
    constructor() {
        app.initializeApp(config);

        this.emailAuthProvider = app.auth.EmailAuthProvider();
        this.auth = app.auth();

        this.googleProvider = new app.auth.GoogleAuthProvider();
        this.facebookProvider = new app.auth.FacebookAuthProvider();
        this.twitterProvider = new app.auth.TwitterAuthProvider();
    }

    doCreateUserWithEmailAndPassword = (email, password) => {
        return this.auth.createUserWithEmailAndPassword(email, password);
    }

    doSignInUserWithEmailAndPassword = (email, password) => {
        return this.auth.signInWithEmailAndPassword(email,password)
    }

    doSignInWithGoogleLogin = () => this.auth.signInWithPopup(this.googleProvider)
    doSignInWithFacebookLogin = () => this.auth.signInWithPopup(this.facebookProvider)
    doSignInWithTwitterLogin = () => this.auth.signInWithPopup(this.twitterProvider)

    doSignOut = () => this.auth.signOut();

    onAuthUserListener = (next, fallback) => {
        return this.auth.onAuthStateChanged(authUser => {
            if (authUser) {
                // TODO axios call to backend
            }
        })
    }

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);
 }

 export default Firebase;