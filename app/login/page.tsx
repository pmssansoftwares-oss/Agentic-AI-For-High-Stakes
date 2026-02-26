"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      const data = (await response.json()) as { message: string };
      setError(data.message || "Login failed");
      return;
    }

    localStorage.setItem("assistant-session", "active");
    localStorage.setItem("assistant-user", email);
    router.replace("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-50 to-slate-100 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-2xl bg-white p-8 shadow-soft">
        <h1 className="mb-2 text-2xl font-bold text-slate-900">Welcome back</h1>
        <p className="mb-6 text-sm text-slate-500">Dummy login: admin@example.com / admin123</p>

        <label className="mb-2 block text-sm font-medium">Email</label>
        <input
          type="email"
          className="mb-4 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-brand-500"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <label className="mb-2 block text-sm font-medium">Password</label>
        <input
          type="password"
          className="mb-4 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-brand-500"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        {error ? <p className="mb-4 text-sm text-red-600">{error}</p> : null}

        <button type="submit" className="w-full rounded-lg bg-brand-600 px-4 py-2 font-medium text-white hover:bg-brand-700">
          Login
        </button>
      </form>
    </div>
  );
}
