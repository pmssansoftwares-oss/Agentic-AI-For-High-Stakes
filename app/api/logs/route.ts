import { NextResponse } from "next/server";
import { readDb } from "@/lib/db";

export async function GET() {
  return NextResponse.json(readDb().logs);
}
