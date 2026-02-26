import { readDb } from "@/lib/db";

export default function ActivityLogsPage() {
  const logs = readDb().logs.slice().reverse();

  return (
    <div className="rounded-xl bg-white p-6 shadow-soft">
      <h2 className="mb-4 text-xl font-bold">Activity Logs</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500">
              <th className="pb-2">Agent Name</th>
              <th className="pb-2">Action</th>
              <th className="pb-2">Status</th>
              <th className="pb-2">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="border-b border-slate-100">
                <td className="py-2">{log.agentName}</td>
                <td className="py-2">{log.action}</td>
                <td className="py-2">{log.status}</td>
                <td className="py-2">{new Date(log.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
