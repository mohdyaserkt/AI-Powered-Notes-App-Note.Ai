// src/app/register/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner"
export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        toast("Success!", {
        description: "Account created. Please log in.",
        action: {
          label: "Go to Login",
          onClick: () => router.push("/login"),
        },
      });
        router.push("/login");
      } else {
        // Handle known errors
        if (res.status === 409) {
          toast("Registration failed", {
          description: "User with this email already exists.",
        });
        } else if (res.status === 400 && data.details) {
          // Zod validation errors
          const firstError = data.details[0];
          toast("Validation error", {
          description: firstError.message,
        });
        } else {
          toast("Registration failed", {
          description: data.error || "Something went wrong.",
        });
        }
      }
    } catch (error) {
      console.error(error);
      toast("Network error", {
      description: "Unable to connect to the server.",
    });
    } finally {
      setLoading(false);
    }
  };

  return (
   <div className="min-h-screen flex items-center justify-center p-4">
  <div className="w-full max-w-md">
      <div className="w-full max-w-md p-6 border rounded-lg shadow-sm">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Create an Account</h1>
          <p className="text-muted-foreground text-sm">
            Join to save and summarize your notes with AI
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              minLength={6}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating account..." : "Sign Up"}
          </Button>

          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline font-medium">
              Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}