import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBNKdECSxpv4qVoi6ZIY0oHUY_UM3y2af0",
    authDomain: "redux-media-auth.firebaseapp.com",
    projectId: "redux-media-auth",
    storageBucket: "redux-media-auth.appspot.com",
    messagingSenderId: "357759826424",
    appId: "1:357759826424:web:5fe19eda68161c640ebe0d"
  };

// const firebaseapp = firebase.initializeApp(firebaseConfig);
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); 
}
const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();

export { auth, facebookProvider, googleProvider}
  