// src/lib/firebaseUser.ts
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db, storage } from "./firebaseClient";

export type RegisterInput = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  country: string;
  city: string;
  imageFile?: File | null;
};

export const registerUserWithProfile = async (data: RegisterInput) => {
  const { email, password, firstName, lastName, phone, country, city, imageFile } = data;

  // 1. Create user in Firebase Auth
  const userCred = await createUserWithEmailAndPassword(auth, email, password);
  const uid = userCred.user.uid;

  // 2. Upload image (optional)
  let photoURL = "/default-user.png";

  if (imageFile) {
    const storageRef = ref(storage, `user_images/${uid}.jpg`);
    await uploadBytes(storageRef, imageFile);
    photoURL = await getDownloadURL(storageRef);
  }

  // 3. Store user profile in Firestore
  await setDoc(doc(db, "users", uid), {
    firstName,
    lastName,
    email,
    phone,
    country,
    city,
    photoURL,
    createdAt: serverTimestamp(),
  });

  return { uid };
};
