import app from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  databaseURL: process.env.REACT_APP_DATABASE_URL
};

class firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    // this.authFn = this.app.auth();
    this.db = app.database();
    // this.dbFn = this.app.database();
  }

  doCreateUserWithEmailAndPassword = (email,password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  user = (uid) => this.db.ref(`users/${uid}`);
  key = () => this.db.ref().push().key;
  timestamp = () => this.db.ServerValue.TIMESTAMP;
  signOut = () => this.auth.signOut();
  onAuthStateChanged = (authUser) => this.authFn.onAuthStateChanged(authUser);
}

export default firebase;