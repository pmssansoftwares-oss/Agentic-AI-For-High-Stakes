import { NextResponse } from "next/server";
import { readDb } from "@/lib/db";

export async function POST(request: Request) {
  const body = (await request.json()) as { email?: string; password?: string };
  const db = readDb();

  const user = db.users.find((entry) => entry.email === body.email && entry.password === body.password);

  if (!user) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }

  return NextResponse.json({ message: "Login success", email: user.email });
}
