import { NextResponse } from "next/server";
import { generateAgentConfig } from "@/lib/openai";

export async function POST(request: Request) {
  const body = (await request.json()) as { userInput?: string };

  if (!body.userInput?.trim()) {
    return NextResponse.json({ message: "User input is required" }, { status: 400 });
  }

  const config = await generateAgentConfig(body.userInput);
  return NextResponse.json(config);
}
