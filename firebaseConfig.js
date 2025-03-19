// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxBloe-A85-N56PjANbmRe1-vc1zsqlpE",
  authDomain: "guardian2025-4d8fe.firebaseapp.com",
  projectId: "guardian2025-4d8fe",
  storageBucket: "guardian2025-4d8fe.firebasestorage.app",
  messagingSenderId: "943022355743",
  appId: "1:943022355743:web:74373932f4da7011c52c2a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);