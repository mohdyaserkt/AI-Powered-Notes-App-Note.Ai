// src/components/layout/DashboardLayout.tsx
"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun, LogOut, Plus, List, FileText } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Notes", href: "/dashboard", icon: FileText },
    { name: "New Note", href: "/dashboard/new", icon: Plus },
  ];

  return (
    <div className="flex min-h-screen  flex-col bg-background">
      {/* Mobile header */}
      <header className="md:hidden border-b p-4 flex justify-between items-center">
        <h1 className="text-lg font-bold">AI Notes</h1>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Mobile Menu (Bottom Sheet Style) */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-background/90 backdrop-blur-sm">
          <div className="absolute bottom-0 left-0 right-0 bg-background border-t rounded-t-xl p-4">
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium">Menu</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(false)}
              >
                ✕
              </Button>
            </div>
            <nav className="space-y-2 mb-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 w-full p-3 rounded-lg ${
                    pathname === item.href
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              ))}
            </nav>
            <Button
              variant="ghost"
              className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={() => signOut({ callbackUrl: "/login" })}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      )}

      {/* Desktop Layout */}
      <div className="hidden md:flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 flex flex-col border-r h-full">
          <div className="p-4">
            <h1 className="text-xl font-bold">AI Notes</h1>
            <p className="text-sm text-muted-foreground">Summarize with AI</p>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t space-y-3">
            <div onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="flex cursor-pointer items-center justify-between p-2 bg-secondary rounded-md">
              <span className="text-sm">Theme</span>
              <Button
                variant="ghost"
                size="icon"
                className="cursor-pointer"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            </div>

            <Button
              variant="ghost"
              className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={() => signOut({ callbackUrl: "/login" })}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {children}
        </main>
      </div>

      {/* Mobile Content (when menu closed) */}
      <main className="md:hidden flex-1 p-4 overflow-auto">
        {children}
      </main>
    </div>
  );
}