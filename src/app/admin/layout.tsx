"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { SidebarProvider, useSidebar } from "@/context/SidebarContext";
import AppHeader from "./layout/AppHeader";
import AppSidebar from "./layout/AppSidebar";
import Backdrop from "./layout/Backdrop";
import React from "react";
import { ThemeProvider } from "@/context/ThemeContext";

function AdminContent({ children }: { children: React.ReactNode }) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const { user, loading } = useAuth();
  const router = useRouter();

  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "lg:ml-[290px]"
    : "lg:ml-[90px]";

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
      <ThemeProvider>
    <div className="min-h-screen xl:flex dark:bg-gray-900">
      <AppSidebar />
      <Backdrop />
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}
      >
        <AppHeader />
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
          {children}
        </div>
      </div>
    </div>
    </ThemeProvider>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AdminContent>{children}</AdminContent>
    </SidebarProvider>
  );
}
