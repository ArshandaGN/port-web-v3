// src/firebase.js (atau bisa nama lain)
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCYOoNmoy-RXTUTo5w8GVoOoDzjdgNjfN0",
  authDomain: "portfolio-web-9cfab.firebaseapp.com",
  projectId: "portfolio-web-9cfab",
  storageBucket: "portfolio-web-9cfab.appspot.com", // ← ini typo sebelumnya! harus `.appspot.com`
  messagingSenderId: "935216664771",
  appId: "1:935216664771:web:83e0f9ee28db57add79276"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
