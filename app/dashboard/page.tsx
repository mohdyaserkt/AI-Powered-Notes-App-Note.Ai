// src/app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Note as NoteType } from "@/types";

export default function DashboardPage() {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch("/api/notes");
        if (!res.ok) {
          if (res.status === 401) {
            router.push("/login");
            return;
          }
          throw new Error("Failed to load notes");
        }
        const data = await res.json();
        setNotes(data.notes || []);
      } catch (err) {
        console.error(err);
        setError("Unable to load notes");
        toast.error("Error", {
          description: "Failed to fetch notes",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [router, toast]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this note?")) return;

    try {
      const res = await fetch(`/api/notes/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setNotes(notes.filter((note) => note._id !== id));
        toast.success("Deleted", {
          description: "Note removed successfully",
        });
      } else {
        throw new Error("Delete failed");
      }
    } catch (err) {
      toast.error("Delete failed", {
        description: "Could not delete the note",
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Your Notes</h1>
        <Button asChild>
          <Link href="/dashboard/new">+ New Note</Link>
        </Button>
      </div>

      {error && (
        <Card className="bg-destructive/10 border-destructive">
          <CardContent className="py-4">{error}</CardContent>
        </Card>
      )}

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6 mt-2" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : notes.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            <p>No notes yet. Create your first note!</p>
          </CardContent>
        </Card>
      ) : (
       <div className="columns-1 md:columns-2 gap-4 space-y-4">
          
          {notes.map((note) => (
            <Card  key={note._id} className="overflow-hidden ">
              <CardHeader className="pb-3">
                <div className="flex flex-wrap justify-between gap-2">
                  <CardTitle className="text-base sm:text-lg flex-1 min-w-0">
                    <span className="line-clamp-2">{note.title}</span>
                  </CardTitle>
                  <div className="flex gap-1 flex-shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="h-8 px-2"
                    >
                      <Link href={`/dashboard/notes/${note._id}`}>View</Link>
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="h-8 px-2"
                      onClick={() => handleDelete(note._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent onClick={()=>router.push(`/dashboard/notes/${note._id}`)} className="cursor-pointer">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {note.content}
                </p>
                {note.summary && (
                  <div className="mt-3 p-2.5 bg-secondary rounded text-xs">
                    <p className="font-medium text-primary">AI Summary:</p>
                    <p className="mt-1">{note.summary}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
