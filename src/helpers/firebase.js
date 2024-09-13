// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfSLETg6fgznM9pRZXsLapPYNR0vQgeVI",
  authDomain: "todotec-bb970.firebaseapp.com",
  projectId: "todotec-bb970",
  storageBucket: "todotec-bb970.appspot.com",
  messagingSenderId: "898061488037",
  appId: "1:898061488037:web:248f72216b138af40fe24c",
  measurementId: "G-Z533VREMKP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();

// Initialize Firestore
const db = getFirestore(app);
export default db;