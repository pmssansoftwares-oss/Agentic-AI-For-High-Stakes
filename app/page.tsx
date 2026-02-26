"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const session = localStorage.getItem("assistant-session");
    router.replace(session ? "/dashboard" : "/login");
  }, [router]);

  return <div className="flex min-h-screen items-center justify-center text-slate-500">Loading...</div>;
}
