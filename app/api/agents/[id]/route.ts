import { NextResponse } from "next/server";
import { readDb, writeDb } from "@/lib/db";
import { Agent } from "@/lib/types";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  const body = (await request.json()) as Partial<Agent>;
  const db = readDb();
  const agent = db.agents.find((entry) => entry.id === id);

  if (!agent) return NextResponse.json({ message: "Agent not found" }, { status: 404 });
  if (!body.name?.trim() || !body.prompt?.trim()) {
    return NextResponse.json({ message: "Name and prompt are required" }, { status: 400 });
  }

  agent.name = body.name;
  agent.description = body.description || "";
  agent.prompt = body.prompt;
  agent.model = body.model === "GPT-4" ? "GPT-4" : "GPT-4-mini";
  agent.status = body.status === "Paused" ? "Paused" : "Active";

  writeDb(db);
  return NextResponse.json(agent);
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  const db = readDb();
  const originalLength = db.agents.length;
  db.agents = db.agents.filter((entry) => entry.id !== id);

  if (db.agents.length === originalLength) {
    return NextResponse.json({ message: "Agent not found" }, { status: 404 });
  }

  writeDb(db);
  return NextResponse.json({ message: "Deleted" });
}
