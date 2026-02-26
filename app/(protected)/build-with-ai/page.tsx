"use client";

import { useState } from "react";

type Preview = { name: string; description: string; prompt: string };

export default function BuildWithAIPage() {
  const [input, setInput] = useState("");
  const [preview, setPreview] = useState<Preview | null>(null);

  const generate = async () => {
    const response = await fetch("/api/build-with-ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userInput: input })
    });
    const data = (await response.json()) as Preview;
    setPreview(data);
  };

  const saveAgent = async () => {
    if (!preview) return;
    await fetch("/api/agents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...preview, model: "GPT-4-mini", status: "Active" })
    });
    setInput("");
    setPreview(null);
    alert("Agent saved.");
  };

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <section className="rounded-xl bg-white p-6 shadow-soft">
        <h2 className="text-xl font-bold">Build with AI</h2>
        <p className="mb-4 mt-1 text-sm text-slate-500">Describe what you want and generate an assistant configuration.</p>
        <textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          className="h-36 w-full rounded-lg border border-slate-300 px-3 py-2"
          placeholder="Create an agent to summarize my emails daily"
        />
        <button onClick={generate} className="mt-3 rounded-lg bg-brand-600 px-4 py-2 font-medium text-white">
          Generate
        </button>
      </section>

      <section className="rounded-xl bg-white p-6 shadow-soft">
        <h3 className="text-lg font-semibold">Preview</h3>
        {!preview ? (
          <p className="mt-2 text-sm text-slate-500">No config generated yet.</p>
        ) : (
          <div className="mt-3 space-y-2 text-sm">
            <p><strong>Name:</strong> {preview.name}</p>
            <p><strong>Description:</strong> {preview.description}</p>
            <p><strong>Prompt:</strong> {preview.prompt}</p>
            <button onClick={saveAgent} className="mt-2 rounded-lg bg-slate-900 px-4 py-2 text-white">Save Agent</button>
          </div>
        )}
      </section>
    </div>
  );
}
