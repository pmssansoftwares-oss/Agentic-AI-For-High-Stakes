"use client";

import { useEffect, useState } from "react";
import { ToolConnection } from "@/lib/types";

export default function ToolsPage() {
  const [tools, setTools] = useState<ToolConnection[]>([]);

  const loadTools = async () => {
    const response = await fetch("/api/tools");
    setTools((await response.json()) as ToolConnection[]);
  };

  useEffect(() => {
    void loadTools();
  }, []);

  const toggle = async (id: number, connected: boolean) => {
    await fetch("/api/tools", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, connected: !connected })
    });
    await loadTools();
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow-soft">
      <h2 className="text-xl font-bold">Tools Integration</h2>
      <p className="mt-1 text-sm text-slate-500">MVP toggles now. MCP connectors can be integrated later.</p>
      <div className="mt-4 space-y-3">
        {tools.map((tool) => (
          <div key={tool.id} className="flex items-center justify-between rounded-lg border border-slate-200 p-3">
            <p>{tool.name}</p>
            <button
              onClick={() => toggle(tool.id, tool.connected)}
              className={`rounded-lg px-3 py-1 text-sm ${tool.connected ? "bg-emerald-600 text-white" : "bg-slate-300"}`}
            >
              {tool.connected ? "Connected" : "Not Connected"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
