// firebase/config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // optional if you’ll store images/files

// ✅ Your Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyBzcZ79G4oMhmhH1hCExBGMpRfeD-s7GvE",
  authDomain: "fruit-pos-c583a.firebaseapp.com",
  projectId: "fruit-pos-c583a",
  storageBucket: "fruit-pos-c583a.firebasestorage.app",
  messagingSenderId: "906115575297",
  appId: "1:906115575297:web:0ddfa970638beedb139a00",
  measurementId: "G-94DNQB6NF7",
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export Firestore & Storage (so other files can use it)
export const db = getFirestore(app);
export const storage = getStorage(app);
