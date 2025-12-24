"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    setLoading(false);
    if (res.ok && data.ok) {
      if (data.role === "admin") {
        router.push("/menu");
      } else {
        router.push("/training_schedule");
      }
    } else {
      setError(data.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-zinc-100 dark:bg-black">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-zinc-900 rounded shadow-md p-8 w-full max-w-xs flex flex-col gap-4 border border-zinc-200 dark:border-zinc-700"
      >
        <h2 className="text-center text-2xl font-bold text-zinc-700 dark:text-white mb-2">Login</h2>
        <label className="flex flex-col gap-1">
          <span className="text-xs text-zinc-600 dark:text-zinc-300">Username</span>
          <input
            type="text"
            className="rounded border border-zinc-300 dark:border-zinc-600 px-3 py-2 text-zinc-800 dark:text-white bg-white dark:bg-zinc-800"
            value={username}
            onChange={e => setUsername(e.target.value)}
            autoFocus
            required
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-xs text-zinc-600 dark:text-zinc-300">Password</span>
          <input
            type="password"
            className="rounded border border-zinc-300 dark:border-zinc-600 px-3 py-2 text-zinc-800 dark:text-white bg-white dark:bg-zinc-800"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </label>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button
          type="submit"
          className={`mt-2 py-2 px-4 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition ${
            loading ? "opacity-60 cursor-wait" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
