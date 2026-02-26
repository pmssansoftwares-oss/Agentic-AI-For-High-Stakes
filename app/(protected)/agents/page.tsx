"use client";

import { FormEvent, useEffect, useState } from "react";
import { Agent } from "@/lib/types";

const initialForm = {
  name: "",
  description: "",
  prompt: "",
  model: "GPT-4" as "GPT-4" | "GPT-4-mini",
  status: "Active" as "Active" | "Paused"
};

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");

  const loadAgents = async () => {
    const response = await fetch("/api/agents");
    const data = (await response.json()) as Agent[];
    setAgents(data);
  };

  useEffect(() => {
    void loadAgents();
  }, []);

  const createAgent = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (!form.name.trim()) return setError("Name is required.");
    if (!form.prompt.trim()) return setError("System prompt is required.");

    const response = await fetch("/api/agents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    if (!response.ok) {
      setError("Could not create agent.");
      return;
    }

    setForm(initialForm);
    await loadAgents();
  };

  return (
    <div className="space-y-5">
      <section className="rounded-xl bg-white p-6 shadow-soft">
        <h2 className="text-xl font-bold">Create New Agent</h2>
        <form onSubmit={createAgent} className="mt-4 grid gap-3 md:grid-cols-2">
          <input
            placeholder="Name*"
            className="rounded-lg border border-slate-300 px-3 py-2"
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
          />
          <input
            placeholder="Description"
            className="rounded-lg border border-slate-300 px-3 py-2"
            value={form.description}
            onChange={(event) => setForm({ ...form, description: event.target.value })}
          />
          <textarea
            placeholder="System Prompt*"
            className="md:col-span-2 rounded-lg border border-slate-300 px-3 py-2"
            value={form.prompt}
            onChange={(event) => setForm({ ...form, prompt: event.target.value })}
          />
          <select
            className="rounded-lg border border-slate-300 px-3 py-2"
            value={form.model}
            onChange={(event) => setForm({ ...form, model: event.target.value as "GPT-4" | "GPT-4-mini" })}
          >
            <option>GPT-4</option>
            <option>GPT-4-mini</option>
          </select>
          <select
            className="rounded-lg border border-slate-300 px-3 py-2"
            value={form.status}
            onChange={(event) => setForm({ ...form, status: event.target.value as "Active" | "Paused" })}
          >
            <option>Active</option>
            <option>Paused</option>
          </select>
          {error ? <p className="md:col-span-2 text-sm text-red-600">{error}</p> : null}
          <button className="md:col-span-2 rounded-lg bg-brand-600 px-4 py-2 font-medium text-white">Create New Agent</button>
        </form>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">Agent List</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent) => (
            <article key={agent.id} className="rounded-xl bg-white p-4 shadow-soft">
              <h3 className="font-semibold">{agent.name}</h3>
              <p className="mt-1 text-sm text-slate-500">{agent.description || "No description"}</p>
              <p className="mt-2 text-xs text-slate-400">{agent.model} • {agent.status}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
