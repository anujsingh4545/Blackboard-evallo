// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBkC0-WuIJDLi6p6eT1oqU325OvlTYSd8",
  authDomain: "blackboard-evallo.firebaseapp.com",
  projectId: "blackboard-evallo",
  storageBucket: "blackboard-evallo.appspot.com",
  messagingSenderId: "207451296919",
  appId: "1:207451296919:web:af40b9be9530a2817a85d2",
  measurementId: "G-DYF2Z3STWQ",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
