"use client";

import { useState } from "react";
import { FaCopy, FaTwitter, FaPinterest, FaWhatsapp } from "react-icons/fa";

export default function PromptShareBar({ title, slug }) {
  const [copied, setCopied] = useState(false);

  const buildUrl = () => {
    if (typeof window !== "undefined") {
      return `${window.location.origin}/prompt/${slug}`;
    }
    return `/prompt/${slug}`;
  };

  const getShareText = () => `${title} — A prompt from PhotoPromptsHub.`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(buildUrl());
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy link:", error);
    }
  };

  const handleShare = (platform) => {
    const url = buildUrl();
    const text = `${getShareText()} ${url}`;

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(getShareText())}&url=${encodeURIComponent(url)}`,
      pinterest: `https://pinterest.com/pin/create/button/?description=${encodeURIComponent(getShareText())}&url=${encodeURIComponent(url)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text)}`
    };

    const destination = shareUrls[platform];
    if (destination) {
      window.open(destination, "_blank", "noopener,noreferrer");
    }
  };

  const buttonClass =
    "flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500";

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <button
          type="button"
          onClick={() => handleShare("twitter")}
          className={`${buttonClass} bg-slate-900 text-white hover:bg-slate-800`}
          aria-label="Share on X"
        >
          <FaTwitter className="w-4 h-4" />
          <span className="hidden md:inline">X</span>
        </button>
        <button
          type="button"
          onClick={() => handleShare("pinterest")}
          className={`${buttonClass} bg-red-600 text-white hover:bg-red-700`}
          aria-label="Share on Pinterest"
        >
          <FaPinterest className="w-4 h-4" />
          <span className="hidden md:inline">Pinterest</span>
        </button>
        <button
          type="button"
          onClick={() => handleShare("whatsapp")}
          className={`${buttonClass} bg-emerald-500 text-white hover:bg-emerald-600`}
          aria-label="Share on WhatsApp"
        >
          <FaWhatsapp className="w-4 h-4" />
          <span className="hidden md:inline">WhatsApp</span>
        </button>
        <button
          type="button"
          onClick={handleCopyLink}
          className={`${buttonClass} ${copied ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-900 hover:bg-slate-200"}`}
          aria-label="Copy link"
        >
          <FaCopy className="w-4 h-4" />
          <span className="hidden md:inline">{copied ? "Copied" : "Copy link"}</span>
        </button>
      </div>
    </div>
  );
}
