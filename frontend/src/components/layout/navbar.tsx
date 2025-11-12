"use client";

import { AlignJustify, BellDot, LogOut, Moon, Settings, Sun, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { href: "/", label: "Dashboard" },
  { href: "/forecasts", label: "Forecasts" },
  { href: "/upload", label: "Upload Data" },
  { href: "/procurement", label: "Procurement" },
  { href: "/settings", label: "Settings" },
];

export function Navbar() {
  const pathname = usePathname();
  const { setTheme, theme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <header className="sticky top-0 z-30 w-full border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <button
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-transparent bg-primary/10 text-primary transition hover:border-primary/20 md:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
          >
            <AlignJustify className="h-5 w-5" />
          </button>

          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-blue-400 text-primary-foreground shadow-lg shadow-primary/30">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-6 w-6 text-primary-foreground"
              >
                <path
                  d="M5 17.5V7.75c0-.69.56-1.25 1.25-1.25h1.5A1.25 1.25 0 0 1 9 7.75v9.75M15 17.5V5.75c0-.69.56-1.25 1.25-1.25h1.5c.69 0 1.25.56 1.25 1.25v11.75M10 17.5v-5.75c0-.69.56-1.25 1.25-1.25h1.5c.69 0 1.25.56 1.25 1.25v5.75"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex flex-col leading-tight text-foreground">
              <span className="text-lg font-semibold tracking-tight">ForecastAI</span>
              <span className="text-xs text-muted-foreground">Inventory Intelligence</span>
            </div>
          </Link>
        </div>

        <nav
          className={cn(
            "absolute left-0 right-0 top-20 flex flex-col gap-4 border-b border-border/40 bg-background/95 px-6 py-6 shadow-lg transition-all duration-200 md:static md:flex md:flex-row md:items-center md:gap-6 md:border-none md:bg-transparent md:px-0 md:py-0 md:shadow-none",
            mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0 md:opacity-100",
          )}
        >
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-foreground",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-primary",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
            <BellDot className="h-5 w-5" />
            <span className="absolute right-2 top-2 inline-flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-destructive" />
            </span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle color scheme"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button variant="ghost" size="pill" className="gap-2 pl-3 pr-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-blue-400 text-white">
              <UserRound className="h-4 w-4" />
            </div>
            <div className="flex flex-col items-start leading-tight">
              <span className="text-xs text-muted-foreground">Signed in as</span>
              <span className="text-sm font-semibold text-foreground">Alex Morgan</span>
            </div>
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle color scheme">
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button variant="ghost" size="icon" aria-label="Settings">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="md:hidden">
          <div className="border-t border-border/50 bg-background/90 px-6 py-4">
            <div className="flex items-center justify-between">
              <Button variant="ghost" className="gap-2">
                <UserRound className="h-5 w-5" />
                <span>Account</span>
              </Button>
              <Button variant="outline" size="sm">
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

