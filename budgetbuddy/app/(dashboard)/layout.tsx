"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UserButton, useUser } from "@clerk/nextjs";
import {
  LayoutDashboard,
  List,
  Menu,
  Plus,
  SettingsIcon,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Add Expense",
    href: "/add",
    icon: Plus,
  },
  {
    title: "All Expense",
    href: "/expenses",
    icon: List,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: SettingsIcon,
  },
];

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-64 bg-secondary backdrop-blur-sm border-r border-slate-700 z-50 transition-transform duration-300 lg:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-5 border-b border-slate-700">
          <Link href={"/dashboard"} className="flex-shrink-0 bg-white/100 rounded-4xl p-0">
            <Image
              src={"/bud-logo.png"}
              alt="Logo"
              width={80}
              height={50}
              className="w-48 h-20 object-cover"
            />
          </Link>

          <Button
            variant="ghost"
            size={"icon"}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={"lg:hidden"}
          >
            <X className="size-5" />
          </Button>
        </div>

        {/* navigation */}
        <nav className="p-4 space-y-2">
          {sidebarItems.map((item, idx) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" &&
                pathname.startsWith(item.href));

            return (
              <Link
                key={idx}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
              >
                <div
                  className={cn(
                    "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                    isActive
                      ? "bg-gradient-to-r from-blue-600/20 to-blue-300/20 border border-blue-500/50 text-white"
                      : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                  )}
                >
                  <item.icon
                    className={cn(
                      "size-5 transition-colors",
                      isActive
                        ? "text-blue-400"
                        : "text-slate-400 group-hover:text-white"
                    )}
                  />
                  <span className="font-medium">{item.title}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex flex-col items-start justify-between gap-1">
            <p className="uppercase font-bold text-white">{user?.fullName}</p>
            <p className="text-xs text-accent">
              {user?.emailAddresses[0].emailAddress}
            </p>
          </div>
        </div>
      </aside>

      <div className="ml-0 lg:ml-64 flex flex-col min-h-screen">
        <header className="fixed w-full top-0 right-0 z-30 bg-primary backdrop-blur-md border-b border-slate-700">
          <div className="flex items-center justify-between px-4 lg:px-8 py-4">
            <div className="flex items-center space-x-4">
              <Button
                variant={"ghost"}
                size={"icon"}
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className={"lg:hidden"}
              >
                <Menu className="size-5" />
              </Button>
            </div>

            <div className="h-10 flex items-center space-x-4">
              <UserButton />
            </div>
          </div>
        </header>

        <main className="mt-[72px] px-4 lg:px-8 py-3 flex-1">
          {children}
        </main>

        <footer className="relative bg-slate-200 z-10 border-t border-purple-500/50 py-5 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-muted-foreground font-semibold">
              © {new Date().getFullYear()} BojetBuddy. All rights
            reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout;
