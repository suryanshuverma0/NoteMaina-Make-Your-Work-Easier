// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaFuacDunb--nZLQMeIecO-PfMI61tw70",
  authDomain: "note-taking-application-f1180.firebaseapp.com",
  projectId: "note-taking-application-f1180",
  storageBucket: "note-taking-application-f1180.appspot.com",
  messagingSenderId: "45703398191",
  appId: "1:45703398191:web:ac28d35404912b11bed7da"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);