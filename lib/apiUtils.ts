// src/lib/apiUtils.ts
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export function handleZodError(err: ZodError<any>) {
  return NextResponse.json(
    { error: "Validation failed", details: err.issues },
    { status: 400 }
  );
}


export function handleError(error: unknown, defaultMessage = "Something went wrong") {
  console.error(error);
  const message = error instanceof Error ? error.message : defaultMessage;
  return NextResponse.json({ error: message }, { status: 500 });
}

export function success(data: any, status = 200) {
  return NextResponse.json(data, { status });
}