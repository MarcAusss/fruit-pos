"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";

type UserMetaCardProps = {
  user: User;
};

export default function UserMetaCard({ user }: UserMetaCardProps) {
  const [phone, setPhone] = useState("");
  const [photoURL, setPhotoURL] = useState(
    user.photoURL || "/images/user/default-avatar.png"
  );
  const [displayName, setDisplayName] = useState(user.displayName || "User");

  useEffect(() => {
    const fetchUserData = async () => {
      const docRef = doc(db, "users", user.uid);
      const snap = await getDoc(docRef);

      if (snap.exists()) {
        const data = snap.data();
        setPhone(data.phone || "");
        setDisplayName(data.displayName || user.displayName);
        setPhotoURL(data.photoURL || user.photoURL);
      }
    };

    fetchUserData();
  }, [user.uid]);

  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-col items-center w-full gap-6 xl:flex-row">

          {/* IMAGE */}
          <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
            <Image width={80} height={80} src={photoURL} alt="User" />
          </div>

          {/* INFO */}
          <div>
            <h4 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white/90">
              {displayName}
            </h4>

            <div className="flex flex-col text-sm text-gray-500 dark:text-gray-400">
              <p>{user.email}</p>
              <p>{phone || "No phone number"}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
