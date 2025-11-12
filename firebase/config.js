// firebase/config.js
import { initializeApp, getApps, getApp } from "firebase/app"; // ✅ Add getApps, getApp
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // optional if you’ll store images/files
import { getAuth } from "firebase/auth"; // ✅ Import Auth


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
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);      // <--- ADD THIS
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;