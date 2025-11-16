// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4WEBstSZDo-xkJtgzdFsFfJELL-LMG_c",
  authDomain: "b12-a10-freelancemarketplace.firebaseapp.com",
  projectId: "b12-a10-freelancemarketplace",
  storageBucket: "b12-a10-freelancemarketplace.firebasestorage.app",
  messagingSenderId: "912108141930",
  appId: "1:912108141930:web:838110211dbff6f89a7913",
  measurementId: "G-SPVQ6C1VZS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);