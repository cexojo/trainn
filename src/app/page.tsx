"use client";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-blue-100 dark:from-black dark:to-blue-950">
      <div className="bg-white dark:bg-zinc-900 rounded shadow-lg px-10 py-12 flex flex-col items-center gap-8 max-w-md w-full border border-zinc-200 dark:border-zinc-700 mt-[-10vh]">
        <h1 className="text-3xl font-bold mb-3 text-blue-900 dark:text-white text-center">Welcome to Trainer Dashboard</h1>
        <p className="text-zinc-700 dark:text-zinc-300 mb-8 text-center">
          Please select what you want to do:
        </p>
        <div className="flex flex-col gap-5 w-full">
          <Link
            href="/dashboard"
            className="inline-block w-full px-6 py-4 bg-blue-600 hover:bg-blue-800 rounded text-xl text-white font-semibold shadow text-center transition"
          >
            🏋️ Go to Athlete Dashboard
          </Link>
          <Link
            href="/wizard"
            className="inline-block w-full px-6 py-4 bg-green-600 hover:bg-green-800 rounded text-xl text-white font-semibold shadow text-center transition"
          >
            🛠️ Create Training Block
          </Link>
        </div>
      </div>
    </div>
  );
}
