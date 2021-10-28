import * as firebase from "firebase";

// credentials of firebase SDK
const firebaseConfig = {
  apiKey: "AIzaSyDZbWgmzrlOopOiWlhNmx6d9IW650deM3E",
  authDomain: "proyecto-final-node.firebaseapp.com",
  projectId: "proyecto-final-node",
  storageBucket: "proyecto-final-node.appspot.com",
  messagingSenderId: "440126488688",
  appId: "1:440126488688:web:373f61dbd0cf2d952a34b5"
};
  
// Initialize app with Firebase
firebase.initializeApp(firebaseConfig);

// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();