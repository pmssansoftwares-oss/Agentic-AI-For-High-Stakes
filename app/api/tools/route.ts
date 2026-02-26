import { NextResponse } from "next/server";
import { readDb, writeDb } from "@/lib/db";

export async function GET() {
  return NextResponse.json(readDb().tools);
}

export async function PATCH(request: Request) {
  const body = (await request.json()) as { id: number; connected: boolean };
  const db = readDb();

  const tool = db.tools.find((entry) => entry.id === body.id);
  if (!tool) return NextResponse.json({ message: "Tool not found" }, { status: 404 });

  tool.connected = body.connected;
  db.logs.push({
    id: db.logs.length ? Math.max(...db.logs.map((log) => log.id)) + 1 : 1,
    agentName: "System",
    action: `${tool.name} ${tool.connected ? "connected" : "disconnected"}`,
    status: "Success",
    timestamp: new Date().toISOString()
  });

  writeDb(db);
  return NextResponse.json(tool);
}
