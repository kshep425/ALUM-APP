import app from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAJL0sGHphzroj8gisC9Vj0aBBy9b6wydk",
    authDomain: "alum-app-1583628178800.firebaseapp.com",
    databaseURL: "https://alum-app-1583628178800.firebaseio.com",
    projectId: "alum-app-1583628178800",
    storageBucket: "alum-app-1583628178800.appspot.com",
    messagingSenderId: "97008398572",
    appId: "1:97008398572:web:79815f75349e8a5ff1f5c9",
    measurementId: "G-PMZV4DFMF1"
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

    doSignout = () => this.auth.signOut();

    onAuthUserListener = (next, fallback) => {
        return this.auth.onAuthStateChanged(authUser => {
            if (authUser) {
                // TODO axios call to backend
            }
        })
    }
 }

 export default Firebase;