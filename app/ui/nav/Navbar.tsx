"use client";

import { LogInIcon, MenuIcon } from "lucide-react";
import { useState, useEffect } from "react";
import NavLinks from "./NavLinks";
import { useSession } from "next-auth/react";
import { getNotifications } from "@/app/lib/data";

export default function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session?.user?.id) {
      const fetchNotifications = async () => {
        try {
          const notifications = await getNotifications(session.user.id);
          setNotificationCount(notifications.length);
        } catch (error) {
          console.error("Failed to fetch notifications:", error);
        }
      };

      fetchNotifications();
    }
  }, [session]);

  if (status === "loading") {
    return null; // or a loading spinner
  }

  if (!session?.user) {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-gray-100 px-4 py-2 md:hidden">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <LogInIcon className="w-6 h-6 mr-2" />
          <span className="text-xl font-bold">Todo.</span>
        </div>
        <button
          className="p-2 focus:outline-none"
          onClick={() => setIsNavOpen(!isNavOpen)}
        >
          <MenuIcon className="w-5 h-5" />
          <span className="sr-only">Toggle navigation</span>
        </button>
      </div>
      {isNavOpen && (
        <div className="py-4">
          <NavLinks notificationCount={notificationCount} />
        </div>
      )}
    </header>
  );
}
