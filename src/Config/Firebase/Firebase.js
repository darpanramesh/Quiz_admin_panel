import firebase from "firebase/app";
import "firebase/database";
import "firebase/firestore";
import 'firebase/storage';
import "firebase/firebase-auth";

var firebaseConfig = {
  apiKey: "AIzaSyBSkjew4hYmduoHBjm7XwoH7adrzJr_BeQ",
  authDomain: "quizamdin.firebaseapp.com",
  databaseURL: "https://quizamdin.firebaseio.com",
  projectId: "quizamdin",
  storageBucket: "quizamdin.appspot.com",
  messagingSenderId: "814240281713",
  appId: "1:814240281713:web:a0601b7d3cfbe15f0817d0",
  measurementId: "G-8M2XXJRRF7"
};
// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);
