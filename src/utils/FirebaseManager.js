import firebase from "firebase";
import uuid from "uuid/v4";
import configs from "../config";

class FirebaseManagerClass {
  constructor(options) {
    this.options = options;
    firebase.initializeApp(options);
    this.provider = new firebase.auth.FacebookAuthProvider();
    this.database = firebase.database();
    this.auth = firebase.auth();
  }

  createNewCuisine(data) {
    // return this.database.ref(`cuisine/${uuid()}`).set({
    //   ...data
    // });
  }

  signInWithPopup = () => {
    return this.auth.signInWithPopup(this.provider);
  };

  signInWithEmailAndPassword(account, password) {
    return this.auth.signInWithEmailAndPassword(account, password);
  }

  createUserWithEmailAndPassword(account, password) {
    return this.auth.createUserWithEmailAndPassword(account, password);
  }

  signOut = () => {
    return this.auth.signOut();
  };

  createNewCuisine(data) {
    return this.database.ref(`cuisine/${uuid()}`).set({
      ...data
    });
  }
}

const FirebaseManager = new FirebaseManagerClass(configs.firebaseConfig);

export default FirebaseManager;
