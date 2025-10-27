// src/app/api/notes/[id]/summarize/route.ts
import { NextRequest } from "next/server";
import Note from "@/models/Note";
import { connectDB } from "@/lib/db";
import { authenticate } from "@/lib/auth";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { handleError, success } from "@/lib/apiUtils";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const auth = await authenticate(req);
    if (!auth) return new Response("Unauthorized", { status: 401 });

    await connectDB();
    const note = await Note.findOne({
      _id: params.id,
      author: auth.userId,
    });
    if (!note) return new Response("Note not found", { status: 404 });

    // Summarize with Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = `Summarize this note in 2-3 concise sentences:\n\n${note.content}`;
    const result = await model.generateContent(prompt);
    const summary = result.response.text().trim();

    // Optionally save summary
    note.summary = summary;
    await note.save();

    return success({ summary });
  } catch (error) {
    return handleError(error, "Failed to summarize note");
  }
}