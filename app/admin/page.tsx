"use client";

import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebaseClient";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/auth/login");
  };
  return (
    <div>
      <h1 className="text-2xl font-bold">Welcome to the Admin Dashboard</h1>
      <p>Only logged-in users can see this page.</p>
      <button onClick={handleLogout} className="text-red-500">
      Logout
    </button>
    </div>
  );
}
