// src/models/Note.ts
import { Schema, model, models } from "mongoose";

const NoteSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  summary: { type: String },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

export default models.Note || model("Note", NoteSchema);