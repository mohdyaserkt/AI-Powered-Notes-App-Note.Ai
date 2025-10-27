// src/app/page.tsx
"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import { Notebook, Bot, Lock, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Avoid hydration mismatch

  return (
    <div className="min-h-screen flex flex-col">
      {/* Theme Toggle (Top Right) */}
      <div className="absolute top-4 right-4 z-10 ">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle theme"
          className="cursor-pointer"
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5 text-yellow-400" />
          ) : (
            <Moon className="h-5 w-5 text-gray-700" />
          )}
        </Button>
      </div>

      {/* Hero Section */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 py-12">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* Logo / App Name */}
          <div className="flex justify-center">
            <div className="bg-primary/10 p-3 rounded-full">
              <Notebook className="h-8 w-8 text-primary" />
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Capture. Organize.{" "}
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Summarize with AI
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto">
            Your intelligent notebook that understands your notes. Powered by Gemini AI.
          </p>

          {/* Feature Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
            {[
              { icon: Notebook, label: "Notes" },
              { icon: Bot, label: "AI Summary" },
              { icon: Lock, label: "Secure" },
              { icon: theme === "dark" ? Moon : Sun, label: "Dark Mode" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center p-3 bg-secondary/30 rounded-lg"
              >
                <item.icon className="h-5 w-5 text-primary mb-1" />
                <span className="text-xs sm:text-sm font-medium">{item.label}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-center">
            <Button asChild size="lg" className="w-full sm:w-auto px-8">
              <Link href="/register">Get Started</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto px-8">
              <Link href="/login">Log In</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-muted-foreground border-t">
        <p>© {new Date().getFullYear()} AI Notes App. All rights reserved.</p>
      </footer>
    </div>
  );
}