// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "roestate-98ac5.firebaseapp.com",
  projectId: "roestate-98ac5",
  storageBucket: "roestate-98ac5.appspot.com",
  messagingSenderId: "211738870291",
  appId: "1:211738870291:web:08b64e9b6cc53ef45035e6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);