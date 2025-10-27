// src/types/index.ts
export interface Note {
  _id: string;
  title: string;
  content: string;
  summary?: string;
  createdAt: string;
  updatedAt: string;
}