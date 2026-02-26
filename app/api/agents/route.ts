import { NextResponse } from "next/server";
import { nextId, readDb, writeDb } from "@/lib/db";
import { Agent } from "@/lib/types";

export async function GET() {
  const db = readDb();
  return NextResponse.json(db.agents);
}

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<Agent>;
  if (!body.name?.trim() || !body.prompt?.trim()) {
    return NextResponse.json({ message: "Name and prompt are required" }, { status: 400 });
  }

  const db = readDb();
  const agent: Agent = {
    id: nextId(db.agents),
    name: body.name,
    description: body.description || "",
    prompt: body.prompt,
    model: body.model === "GPT-4" ? "GPT-4" : "GPT-4-mini",
    status: body.status === "Paused" ? "Paused" : "Active",
    createdAt: new Date().toISOString()
  };

  db.agents.push(agent);
  db.logs.push({
    id: nextId(db.logs),
    agentName: agent.name,
    action: "Created agent",
    status: "Success",
    timestamp: new Date().toISOString()
  });

  writeDb(db);
  return NextResponse.json(agent, { status: 201 });
}
