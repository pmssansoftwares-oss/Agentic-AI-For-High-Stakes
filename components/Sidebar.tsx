"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/agents", label: "Agents" },
  { href: "/build-with-ai", label: "Build with AI" },
  { href: "/tools", label: "Tools" },
  { href: "/activity-logs", label: "Activity Logs" },
  { href: "/settings", label: "Settings" }
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full max-w-xs border-r border-slate-200 bg-white p-5">
      <h1 className="mb-6 text-xl font-bold text-brand-700">Personal AI Assistant</h1>
      <nav className="space-y-2">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-lg px-4 py-2 text-sm transition ${
                active ? "bg-brand-100 text-brand-700" : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
