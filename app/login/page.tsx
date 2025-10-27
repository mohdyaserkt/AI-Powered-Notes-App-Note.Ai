// src/app/login/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { Suspense } from 'react'
function LoginPage() {
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered");
  const [email, setEmail] = useState(!registered?"testuser@gmail.com":"");
  const [password, setPassword] = useState(!registered?"TestUserPassword":"");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (result?.error) {
      toast.error("Login failed", {
        description: result.error || "Something went wrong.",
      });
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md space-y-4 p-6 border rounded-lg"
        >
          <h1 className="text-2xl font-bold">Login</h1>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
          <p className="text-center text-sm">
            Don’t have an account?{" "}
            <a href="/register" className="text-primary hover:underline">
              Register
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

function LoginFallback() {
  return <>During production builds, a static page that calls useSearchParams from a Client Component must be wrapped in a Suspense boundary, otherwise the build fails with the Missing Suspense boundary with useSearchParams error.</>
}

export default function Page() {
  return (
    <>
      <nav>
        <Suspense fallback={<LoginFallback />}>
          <LoginPage />
        </Suspense>
      </nav>
      <h1>Dashboard</h1>
    </>
  )
}