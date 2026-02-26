import fs from "node:fs";
import path from "node:path";
import { Database } from "@/lib/types";

const dbPath = path.join(process.cwd(), "data", "db.json");

export function readDb(): Database {
  const raw = fs.readFileSync(dbPath, "utf8");
  return JSON.parse(raw) as Database;
}

export function writeDb(data: Database) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

export function nextId(items: { id: number }[]) {
  return items.length ? Math.max(...items.map((item) => item.id)) + 1 : 1;
}
