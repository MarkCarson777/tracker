import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBT0354RJyo9XLaSsvaacqNixOE1RcRXnQ",
  authDomain: "tracker-7a679.firebaseapp.com",
  projectId: "tracker-7a679",
  storageBucket: "tracker-7a679.firebasestorage.app",
  messagingSenderId: "469892355374",
  appId: "1:469892355374:web:7decaded7eb811ccf156bf",
  measurementId: "G-8XG40DRK58",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);
