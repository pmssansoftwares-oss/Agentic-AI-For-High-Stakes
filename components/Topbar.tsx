"use client";

import { useRouter } from "next/navigation";

export default function Topbar() {
  const router = useRouter();
  const userEmail = typeof window !== "undefined" ? localStorage.getItem("assistant-user") : "";

  const logout = () => {
    localStorage.removeItem("assistant-session");
    localStorage.removeItem("assistant-user");
    router.replace("/login");
  };

  return (
    <header className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-soft">
      <p className="text-sm text-slate-600">{userEmail || "admin@example.com"}</p>
      <button
        onClick={logout}
        className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
      >
        Logout
      </button>
    </header>
  );
}
