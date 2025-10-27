// src/app/dashboard/new/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default function NewNotePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Note created!");
        router.push("/dashboard");
      } else {
        const msg = data.error || "Failed to create note";
        toast.error("Error", {
          description: msg,
        });
      }
    } catch (err) {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl w-full mx-auto">
        <h1 className="text-2xl font-bold mb-6">New Note</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Note title"
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Content</Label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your thoughts..."
              className="min-h-[200px]"
              required
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-2 pt-2">
  <Button type="submit" disabled={loading} className="w-full sm:w-auto">
    {loading ? "Saving..." : "Save Note"}
  </Button>
  <Button
    type="button"
    variant="outline"
    onClick={() => router.back()}
    className="w-full sm:w-auto"
  >
    Cancel
  </Button>
</div>
        </form>
      </div>
    </DashboardLayout>
  );
}
