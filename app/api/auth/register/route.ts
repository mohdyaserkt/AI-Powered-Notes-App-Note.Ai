// src/app/api/auth/register/route.ts
import { NextRequest } from "next/server";
import { registerSchema } from "@/lib/validation";
import User from "@/models/User";
import { connectDB } from "@/lib/db";
import { handleZodError, handleError, success } from "@/lib/apiUtils";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = registerSchema.safeParse(body);
    if (!validated.success) return handleZodError(validated.error);

    await connectDB();
    const { email, password } = validated.data;

    const existing = await User.findOne({ email });
    if (existing) {
      return new Response(JSON.stringify({ error: "User already exists" }), {
        status: 409,
        headers: { "Content-Type": "application/json" },
      });
    }

    await User.create({ email, password });
    return success({ message: "User registered successfully" }, 201);
  } catch (error) {
    return handleError(error, "Registration failed");
  }
}