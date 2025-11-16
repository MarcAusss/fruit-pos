import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db, storage } from "../../firebase/config";

type RegisterInput = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  country: string;
  city: string;
  imageFile?: File | null;
};

export const registerUser = async (data: RegisterInput) => {
  const { email, password, firstName, lastName, phone, country, city, imageFile } = data;

  const userCred = await createUserWithEmailAndPassword(auth, email, password);
  const uid = userCred.user.uid;

  let photoURL = "/default-user.png";

  if (imageFile) {
    const storageRef = ref(storage, `user_images/${uid}.jpg`);
    await uploadBytes(storageRef, imageFile);
    photoURL = await getDownloadURL(storageRef);
  }

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

  return { success: true, uid };
};
