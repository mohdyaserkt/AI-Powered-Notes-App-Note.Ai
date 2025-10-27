// src/app/api/notes/route.ts
import { NextRequest } from "next/server";
import { noteSchema } from "@/lib/validation";
import Note from "@/models/Note";
import { connectDB } from "@/lib/db";
import { authenticate } from "@/lib/auth";
import { handleZodError, handleError, success } from "@/lib/apiUtils";

export async function GET(req: NextRequest) {
  try {
    const auth = await authenticate(req);
    if (!auth) return new Response("Unauthorized", { status: 401 });

    await connectDB();
    const notes = await Note.find({ author: auth.userId }).select("-author");
    return success({ notes });
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = await authenticate(req);
    if (!auth) return new Response("Unauthorized", { status: 401 });

    const body = await req.json();
    const validated = noteSchema.safeParse(body);
    if (!validated.success) return handleZodError(validated.error);

    await connectDB();
    const note = await Note.create({
      ...validated.data,
      author: auth.userId,
    });
    return success(note, 201);
  } catch (error) {
    return handleError(error);
  }
}