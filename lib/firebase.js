// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBu2xFvwqkejytCcsxRlkPJuzVilIgJ4x4",
  authDomain: "phremix-sepolia.firebaseapp.com",
  databaseURL: "https://phremix-sepolia-default-rtdb.firebaseio.com",
  projectId: "phremix-sepolia",
  storageBucket: "phremix-sepolia.firebasestorage.app",
  messagingSenderId: "633095176696",
  appId: "1:633095176696:web:f5c970a5c046a32d73960d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const db = getDatabase(app);

export {app, db};