// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCyQ-Lf8YvQY-FMIhkv_fO1FMz4Ld8BGxI",
  authDomain: "proyectos-90c6a.firebaseapp.com",
  projectId: "proyectos-90c6a",
  storageBucket: "proyectos-90c6a.appspot.com",
  messagingSenderId: "650214500009",
  appId: "1:650214500009:web:78815b9bce6350260eebb8",
  measurementId: "G-SJCXELG1C5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);