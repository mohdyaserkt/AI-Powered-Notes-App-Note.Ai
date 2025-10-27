// src/app/dashboard/notes/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner"
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Note } from "@/types";

export default function NoteDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [summarizing, setSummarizing] = useState(false);
  const router = useRouter();


  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await fetch(`/api/notes/${id}`);
        if (!res.ok) {
          if (res.status === 401) router.push("/login");
          else if (res.status === 404) router.push("/dashboard");
          else throw new Error("Failed to load note");
          return;
        }
        const data = await res.json();
        setNote(data);
      } catch (err) {
        toast.error("Error", {
  description: "Could not load note",
});
        router.push("/dashboard");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchNote();
  }, [id, router, toast]);

  const handleSave = async () => {
    if (!note) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/notes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: note.title, content: note.content }),
      });
      if (res.ok) {
        toast("Note updated!");
      } else {
        throw new Error("Update failed");
      }
    } catch (err) {
     toast.error("Save failed");

    } finally {
      setSaving(false);
    }
  };

  const handleSummarize = async () => {
    if (!note) return;
    setSummarizing(true);
    try {
      const res = await fetch(`/api/notes/${id}/summarize`, { method: "POST" });
      if (res.ok) {
        const data = await res.json();
        setNote({ ...note, summary: data.summary });
        toast.success("Summary generated!" )
    
      } else {
        throw new Error("Summarization failed");
      }
    } catch (err) {
      toast.error("AI error", {
  description: "Could not summarize",
});
    } finally {
      setSummarizing(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-1/3" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-32 w-full" />
          </CardContent>
        </Card>
      </DashboardLayout>
    );
  }

  if (!note) return null;

  return (
    <DashboardLayout>
      <div className="max-w-2xl w-full mx-auto">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-2xl font-bold">Edit Note</h1>
          <div className="flex gap-2">
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </Button>
            <Button
              onClick={handleSummarize}
              disabled={summarizing || !note.content.trim()}
              variant="secondary"
            >
              {summarizing ? "Summarizing..." : "Summarize with AI"}
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              value={note.title}
              onChange={(e) => setNote({ ...note, title: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Content</Label>
            <Textarea
              value={note.content}
              onChange={(e) => setNote({ ...note, content: e.target.value })}
              className="min-h-[300px]"
            />
          </div>

          {note.summary && (
            <Card>
              <CardHeader>
                <CardTitle className="text-primary flex items-center gap-2">
                  AI Summary
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setNote({ ...note, summary: undefined })}
                  >
                    ✕
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{note.summary}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}