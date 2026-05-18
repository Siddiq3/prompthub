"use client";

import Link from "next/link";
import { SITE_URL } from "@/src/config";

export function PromptActionsPanel({ prompt, negativePromptText }) {
  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(prompt.prompt || "").then(() => {
      alert("Prompt copied to clipboard!");
    });
  };

  const handleCopyNegative = () => {
    navigator.clipboard.writeText(negativePromptText).then(() => {
      alert("Negative prompt copied!");
    });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${SITE_URL}/prompts/${prompt.id}`).then(() => {
      alert("Link copied to clipboard!");
    });
  };

  return (
    <div className="sticky top-4 space-y-4 p-6 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
        Quick Actions
      </h3>

      {/* Copy Main Prompt Button */}
      <button
        onClick={handleCopyPrompt}
        className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold rounded-lg hover:opacity-90 transition-opacity"
      >
        📋 Copy Prompt
      </button>

      {negativePromptText && (
        <button
          onClick={handleCopyNegative}
          className="w-full px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:opacity-90 transition-opacity"
        >
          ✕ Copy Negative
        </button>
      )}

      {/* Share Buttons */}
      <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
        <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-3">
          Share
        </p>
        <div className="space-y-2">
          {/* WhatsApp */}
          <a
            href={`https://wa.me/?text=${encodeURIComponent(
              `Check out this ${prompt.model} prompt: "${prompt.title}" - ${SITE_URL}/prompts/${prompt.id}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-semibold"
          >
            💬 WhatsApp
          </a>

          {/* Twitter/X */}
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
              `${SITE_URL}/prompts/${prompt.id}`
            )}&text=${encodeURIComponent(
              `Check out "${prompt.title}" AI prompt for ${prompt.model}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-semibold"
          >
            𝕏 Tweet
          </a>

          {/* Copy Link */}
          <button
            onClick={handleCopyLink}
            className="flex items-center justify-center w-full px-4 py-2 bg-slate-600 text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-semibold"
          >
            🔗 Copy Link
          </button>
        </div>
      </div>

      {/* Back Button */}
      <Link
        href="/prompts"
        className="flex items-center justify-center w-full px-6 py-2 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-semibold"
      >
        ← Back to All Prompts
      </Link>
    </div>
  );
}
