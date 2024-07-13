// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-state-7fbf8.firebaseapp.com",
  projectId: "mern-state-7fbf8",
  storageBucket: "mern-state-7fbf8.appspot.com",
  messagingSenderId: "51818836358",
  appId: "1:51818836358:web:ebd71bac82a6801e787c07",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
