"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { Notification } from "../../types/Notification";
import { getChangedFields } from "@/utils/getChangedFields";
import { db } from "../../../firebase/config";
import { collection, onSnapshot } from "firebase/firestore";
import { User } from "../../types/User";

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);
  const [prevUsers, setPrevUsers] = useState<Record<string, User>>({});
  const [userUpdates, setUserUpdates] = useState<Notification[]>([]);

  function toggleDropdown() {
    setIsOpen((prev) => !prev);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  const handleClick = () => {
    toggleDropdown();
    setNotifying(false);
  };

  // 🔥 FIRESTORE LISTENER — handles notifications safely with no loops
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "users"), (snapshot) => {
      setPrevUsers((prevUsersState) => {
        const newPrevUsers = { ...prevUsersState };
        const updates: Notification[] = [];

        snapshot.docs.forEach((doc) => {
          const newData: User = {
            id: doc.id,
            ...(doc.data() as Omit<User, "id">),
          };

          const oldData = prevUsersState[doc.id];

          // NEW USER
          if (!oldData) {
            updates.push({
              id: doc.id,
              message: `${newData.name || "A user"} was created`,
              time: "Just now",
              type: "added",
            });
          }

          // UPDATED USER
          else {
            const changedFields = getChangedFields(oldData, newData);
            if (changedFields.length > 0) {
              updates.push({
                id: doc.id,
                message: `${
                  newData.name || "A user"
                } updated: ${changedFields.join(", ")}`,
                time: "Just now",
                type: "updated",
              });
            }
          }

          newPrevUsers[doc.id] = newData;
        });

        if (updates.length > 0) {
          setUserUpdates((prev) => [...updates, ...prev]);
        }

        return newPrevUsers;
      });
    });

    return () => unsub();
  }, []); // ← correct: runs once, ESLint satisfied

  return (
    <div className="relative">
      {/* BUTTON */}
      <button
        className="relative dropdown-toggle flex items-center justify-center text-gray-500 transition-colors bg-white border border-gray-200 rounded-full hover:text-gray-700 h-11 w-11 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
        onClick={handleClick}
      >
        <span
          className={`absolute right-0 top-0.5 z-10 h-2 w-2 rounded-full bg-orange-400 ${
            !notifying ? "hidden" : "flex"
          }`}
        >
          <span className="absolute inline-flex w-full h-full bg-orange-400 rounded-full opacity-75 animate-ping"></span>
        </span>

        {/* FIXED ICON */}
        <svg
          className="fill-current"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 1 L18 10 L10 19 L2 10 Z" fill="currentColor" />
        </svg>
      </button>

      {/* DROPDOWN */}
      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="absolute -right-[240px] mt-[17px] flex h-[480px] w-[350px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark sm:w-[361px] lg:right-0"
      >
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100 dark:border-gray-700">
          <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Notification
          </h5>
          <button
            onClick={toggleDropdown}
            className="text-gray-500 transition dropdown-toggle dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            ❌
          </button>
        </div>

        {/* LIST OF NOTIFICATIONS */}
        <ul className="flex flex-col h-auto overflow-y-auto custom-scrollbar">
          {userUpdates.map((n, index) => (
            <li key={`${n.id}-${index}`}>
              <DropdownItem
                onItemClick={closeDropdown}
                className="flex gap-3 rounded-lg border-b border-gray-100 p-3 px-4.5 py-3 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-white/5"
              >
                <span className="relative block w-full h-10 rounded-full z-1 max-w-10">
                  <Image
                    width={40}
                    height={40}
                    src="/images/user/user-02.jpg"
                    alt="User"
                    className="w-full overflow-hidden rounded-full"
                  />
                </span>

                <span>
                  <span className="mb-1.5 block space-x-1 text-theme-sm text-gray-500 dark:text-gray-400">
                    <span className="font-medium text-gray-800 dark:text-white/90">
                      User Update:
                    </span>
                    <span>{n.message}</span>
                  </span>

                  <span className="flex items-center gap-2 text-gray-500 text-theme-xs dark:text-gray-400">
                    <span>User</span>
                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                    <span>{n.time}</span>
                  </span>
                </span>
              </DropdownItem>
            </li>
          ))}
        </ul>

        <Link
          href="/"
          className="block px-4 py-2 mt-3 text-sm font-medium text-center text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
        >
          View All Notifications
        </Link>
      </Dropdown>
    </div>
  );
}
