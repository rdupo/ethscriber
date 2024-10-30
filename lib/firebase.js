// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; // Use this for Realtime Database
// import { getFirestore } from "firebase/firestore"; // Use this for Firestore if you need it

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCiWZgNJuwJ-ih-5f_WMu5azLvfjCvVVZs",
  authDomain: "phreemix-sepolia.firebaseapp.com",
  projectId: "phreemix-sepolia",
  storageBucket: "phreemix-sepolia.appspot.com",
  messagingSenderId: "225128076538",
  appId: "1:225128076538:web:a03f05cfa1e38bd53fe543",
  measurementId: "G-JR272YKJF1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app); // Use getFirestore(app) if using Firestore

export { db };
