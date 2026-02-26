import { readDb } from "@/lib/db";

export default function DashboardPage() {
  const db = readDb();
  const recent = db.logs.slice(-5).reverse();

  return (
    <div className="space-y-5">
      <section className="rounded-xl bg-white p-6 shadow-soft">
        <h2 className="text-2xl font-bold">Welcome to your AI Assistant dashboard</h2>
        <p className="mt-2 text-slate-600">Manage agents, tools, and activity in one place.</p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl bg-white p-5 shadow-soft">
          <p className="text-sm text-slate-500">Total Agents</p>
          <p className="text-3xl font-bold text-brand-700">{db.agents.length}</p>
        </div>
      </section>

      <section className="rounded-xl bg-white p-6 shadow-soft">
        <h3 className="mb-3 text-lg font-semibold">Recent Activities</h3>
        {recent.length === 0 ? (
          <p className="text-sm text-slate-500">No recent logs yet.</p>
        ) : (
          <ul className="space-y-2">
            {recent.map((log) => (
              <li key={log.id} className="rounded-lg border border-slate-200 p-3 text-sm">
                <strong>{log.agentName}</strong> - {log.action} ({log.status})
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
