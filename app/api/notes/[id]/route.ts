// src/app/api/notes/[id]/route.ts
import { NextRequest } from "next/server";
import { noteSchema } from "@/lib/validation";
import Note from "@/models/Note";
import { connectDB } from "@/lib/db";
import { authenticate } from "@/lib/auth";
import { handleZodError, handleError, success } from "@/lib/apiUtils";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> } 
) {
  try {
    const { id } = await context.params;
    const auth = await authenticate(req);
    if (!auth) return new Response("Unauthorized", { status: 401 });

    await connectDB();
    const note = await Note.findOne({
      _id:id,
      author: auth.userId,
    });
    if (!note) return new Response("Note not found", { status: 404 });
    return success(note);
  } catch (error) {
    return handleError(error);
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> } 
) {
  try {
    const { id } = await context.params;
    const auth = await authenticate(req);
    if (!auth) return new Response("Unauthorized", { status: 401 });

    const body = await req.json();
    const validated = noteSchema.safeParse(body);
    if (!validated.success) return handleZodError(validated.error);

    await connectDB();
    const note = await Note.findOneAndUpdate(
      { _id:id, author: auth.userId },
      validated.data,
      { new: true }
    );
    if (!note) return new Response("Note not found", { status: 404 });
    return success(note);
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> } 
) {
  try {
    const { id } = await context.params;
    const auth = await authenticate(req);
    if (!auth) return new Response("Unauthorized", { status: 401 });

    await connectDB();
    const result = await Note.deleteOne({
      _id:id,
      author: auth.userId,
    });
    if (result.deletedCount === 0)
      return new Response("Note not found", { status: 404 });
    return success({ message: "Note deleted" });
  } catch (error) {
    return handleError(error);
  }
}