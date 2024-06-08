// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import {getStorage , ref , uploadBytes ,getDownloadURL} from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyBi1JlCMfhk7hLCxoUQEQYjX44YheNv5AE",
  authDomain: "holads.firebaseapp.com",
  projectId: "holads",
  storageBucket: "holads.appspot.com",
  messagingSenderId: "111699694477",
  appId: "1:111699694477:web:409aeacd405b4932b863c4",
  measurementId: "G-G1N0F3YZ0K",
};

const uuid = uuidv4();
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
export const auth = getAuth(app);

export const storage = getStorage(app)
export async function uploadFile (file){// este transforma las imagenes en url
    const storageRef = ref(storage , uuid) 
    await uploadBytes(storageRef , file)
    const url = await getDownloadURL(storageRef)
    return url
 }