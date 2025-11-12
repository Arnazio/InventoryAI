"use client";

import { ReactNode } from "react";

import { Navbar } from "@/components/layout/navbar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-background via-background to-blue-50/40 dark:from-background dark:via-background dark:to-slate-900/60">
      <Navbar />
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 pb-16 pt-8 md:gap-10">
        {children}
      </main>
    </div>
  );
}

