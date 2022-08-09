import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAV66eH3nW2qxzPShtbclhCK9UOG0Rxvrc",
  authDomain: "thedojoapp-81333.firebaseapp.com",
  projectId: "thedojoapp-81333",
  storageBucket: "thedojoapp-81333.appspot.com",
  messagingSenderId: "294528248599",
  appId: "1:294528248599:web:e3bc65ed041e378f8ea552",
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

const timestamp = firebase.firestore.Timestamp;

export { projectAuth, projectFirestore, projectStorage, timestamp };
