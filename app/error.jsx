"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-950">
        <h1 className="mb-4 text-2xl font-bold text-brand-ink dark:text-white">
          Something went wrong
        </h1>
        <p className="mb-6 text-slate-600 dark:text-slate-400">
          We encountered an error while processing your request.
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => reset()}
            className="flex-1 rounded-full bg-brand-accent px-6 py-2 font-semibold text-white transition hover:opacity-90"
          >
            Try again
          </button>
          <Link
            href="/"
            className="flex-1 rounded-full border border-slate-300 bg-white px-6 py-2 font-semibold text-brand-ink transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
