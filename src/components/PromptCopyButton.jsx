"use client";

import { useState } from "react";
import { FaCopy, FaCheck } from "react-icons/fa";

export default function PromptCopyButton({ promptText, label = "Copy prompt" }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!promptText) return;
    try {
      await navigator.clipboard.writeText(promptText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy prompt:", error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 ${
        copied
          ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
          : "bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
      }`}
    >
      {copied ? <FaCheck className="w-4 h-4" /> : <FaCopy className="w-4 h-4" />}
      {copied ? "Copied!" : label}
    </button>
  );
}
