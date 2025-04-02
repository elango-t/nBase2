// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBE1nkfHYZP3oaMPW6dQOwxr33uksAlUj4",
  authDomain: "e-commerce-e398d.firebaseapp.com",
  projectId: "e-commerce-e398d",
  storageBucket: "e-commerce-e398d.firebasestorage.app",
  messagingSenderId: "26008456697",
  appId: "1:26008456697:web:99713268cacb177fcec128",
  measurementId: "G-QGW2V0QF01"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)
export const auth=getAuth(app)