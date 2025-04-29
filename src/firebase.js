// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAoEkY0wOWET7NbJoNTcAAcpgeELrlsNQ8",
  authDomain: "energybuddy-f15f1.firebaseapp.com",
  projectId: "energybuddy-f15f1",
  storageBucket: "energybuddy-f15f1.appspot.com",
  messagingSenderId: "834840002104",
  appId: "1:834840002104:web:77a329c6c10eba8a5430cd",
  measurementId: "G-V0XJ3C6N8E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
