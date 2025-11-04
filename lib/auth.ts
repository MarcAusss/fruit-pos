import { auth } from "@/lib/firebaseClient";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

/**
 * Register a new user with Firebase Auth.
 */
export async function registerUser(email: string, password: string) {
    console.log("🔗 Trying to register:", email); // <--- add this
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("✅ Registered:", userCredential.user.uid); // <--- add this
        return userCredential.user;
    } catch (error) {
        if (error instanceof Error) throw new Error(error.message);
        throw new Error("Failed to register");
    }
}

/**
 * Log in an existing user with Firebase Auth.
 */
export async function loginUser(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
    throw new Error("Failed to login");
  }
}
