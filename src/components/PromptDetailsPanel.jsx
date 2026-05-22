"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBookmark, FaCheck, FaChevronDown, FaChevronUp, FaCopy, FaLink, FaRegBookmark } from "react-icons/fa";
import { useCopyCount } from "@/src/hooks/useCopyCount";

const modelColors = {
  "Midjourney": "bg-purple-600",
  "DALL-E": "bg-pink-600",
  "Stable Diffusion": "bg-blue-600",
  "Flux": "bg-orange-600",
  "Adobe Firefly": "bg-red-600",
};

const getSizeLabel = (aspectRatio) => {
  if (!aspectRatio) return "1024×1024";
  if (aspectRatio.includes("4:5")) return "1024×1280";
  if (aspectRatio.includes("1:1")) return "1024×1024";
  if (aspectRatio.includes("16:9")) return "1920×1080";
  if (aspectRatio.includes("3:2")) return "1536×1024";
  return "1024×1024";
};

export default function PromptDetailsPanel({ prompt, promptText, pageUrl }) {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [animatingCount, setAnimatingCount] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [negativeOpen, setNegativeOpen] = useState(false);
  const { copyCount, refetch: refetchCopyCount } = useCopyCount(prompt.id, prompt.copies || 0);

  const aspectRatio = prompt.aspectRatio || "1:1";
  const promptModel = prompt.modelLabel || prompt.model || "AI model";
  const formattedDate = prompt.formattedDate || prompt.createdAt || "";
  const sizeLabel = prompt.size || getSizeLabel(aspectRatio);
  const negativePrompt = prompt.negativePrompt || "";
  const trimmedPrompt = String(promptText || "").trim();
  const wordCount = trimmedPrompt ? trimmedPrompt.split(/\s+/).filter(Boolean).length : 0;
  const charCount = trimmedPrompt.length;

  const copyToClipboard = async (value, updateState) => {
    try {
      await navigator.clipboard.writeText(value);
      updateState(true);
      window.setTimeout(() => updateState(false), 2000);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  const handleCopyPrompt = async () => {
    if (!trimmedPrompt) return;
    
    // Track the copy
    try {
      const response = await fetch("/api/track-copy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ promptId: prompt.id }),
      });
      if (response.ok) {
        setAnimatingCount(true);
        setTimeout(() => setAnimatingCount(false), 600);
        // Refetch to update count
        refetchCopyCount();
      }
    } catch (error) {
      console.error("Error tracking copy:", error);
    }

    // Copy to clipboard
    await copyToClipboard(trimmedPrompt, setCopied);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: prompt.title, text: prompt.title, url: pageUrl });
        return;
      } catch (error) {
        // fallback to copy link
      }
    }
    await copyToClipboard(pageUrl, setLinkCopied);
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-3">
        <button
          type="button"
          onClick={handleCopyPrompt}
          className={`w-full h-[52px] rounded-full text-sm font-semibold transition duration-200 ${copied ? "bg-emerald-500 text-white" : "bg-violet-600 text-white hover:bg-violet-500"}`}
        >
          {copied ? (
            <span className="inline-flex items-center justify-center gap-2">
              <FaCheck className="w-4 h-4" /> Copied!
            </span>
          ) : (
            <span className="inline-flex items-center justify-center gap-2">
              <FaCopy className="w-4 h-4" /> Copy Prompt
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => setSaved((current) => !current)}
          className={`w-full h-[52px] rounded-full border text-sm font-semibold transition duration-200 ${saved ? "border-emerald-500 bg-emerald-500/10 text-emerald-200" : "border-slate-700 bg-slate-950 text-slate-100 hover:border-slate-500 hover:bg-slate-900"}`}
        >
          <span className="inline-flex items-center justify-center gap-2">
            {saved ? <FaBookmark className="w-4 h-4" /> : <FaRegBookmark className="w-4 h-4" />} {saved ? "Saved" : "Save for later"}
          </span>
        </button>

        <button
          type="button"
          onClick={handleShare}
          className={`inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-300 bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-900 transition duration-200 hover:border-slate-400 hover:bg-slate-200`}
        >
          <FaLink className="w-4 h-4" /> {linkCopied ? "Copied!" : "Share"}
        </button>
      </div>

      <div className="relative rounded-2xl border border-white/10 bg-[#131729] p-5">
        <button
          type="button"
          onClick={handleCopyPrompt}
          className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-slate-900/80 text-slate-300 transition hover:bg-slate-800"
          aria-label="Copy prompt"
        >
          <FaCopy className="w-4 h-4" />
        </button>
        <div className="pt-2">
          <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">Prompt</p>
          <div className="mt-4 text-sm leading-7 text-[#C8C3BE] whitespace-pre-wrap break-words font-sans">
            {trimmedPrompt || "No prompt text available."}
          </div>
        </div>
      </div>

      <p className="text-sm text-slate-500">{wordCount} words · {charCount} characters</p>

      {negativePrompt ? (
        <section className="rounded-2xl border border-white/10 bg-[#131729]">
          <button
            type="button"
            onClick={() => setNegativeOpen((current) => !current)}
            className="flex w-full items-center justify-between rounded-2xl px-5 py-4 text-left text-sm font-semibold text-slate-100 transition duration-200 hover:bg-white/5"
            aria-expanded={negativeOpen}
          >
            <span className="block">
              <span className="text-[11px] uppercase tracking-[0.28em] text-slate-500">Negative Prompt (Optional)</span>
              <span className="mt-1 block text-slate-200 text-sm font-medium">Tap to expand</span>
            </span>
            <span className="inline-flex items-center justify-center rounded-full bg-slate-900/80 p-2 text-slate-300">
              {negativeOpen ? <FaChevronUp className="w-4 h-4" /> : <FaChevronDown className="w-4 h-4" />}
            </span>
          </button>
          {negativeOpen && (
            <div className="border-t border-white/10 px-5 py-4 text-sm leading-7 text-[#C8C3BE]">
              {negativePrompt}
            </div>
          )}
        </section>
      ) : null}

      <section className="rounded-2xl border border-slate-800 bg-slate-950 p-5 text-sm text-slate-400">
        <div className="grid gap-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <span className="text-[11px] uppercase tracking-[0.28em] text-slate-500">Model</span>
            <span className="font-medium text-slate-100">{promptModel}</span>
          </div>
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <span className="text-[11px] uppercase tracking-[0.28em] text-slate-500">Category</span>
            <span className="font-medium text-slate-100">{prompt.category || "—"}</span>
          </div>
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <span className="text-[11px] uppercase tracking-[0.28em] text-slate-500">Aspect ratio</span>
            <span className="font-medium text-slate-100">{aspectRatio}</span>
          </div>
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <span className="text-[11px] uppercase tracking-[0.28em] text-slate-500">Size</span>
            <span className="font-medium text-slate-100">{sizeLabel}</span>
          </div>
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <span className="text-[11px] uppercase tracking-[0.28em] text-slate-500">Date added</span>
            <span className="font-medium text-slate-100">{formattedDate}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-[0.28em] text-slate-500">Times copied</span>
            <motion.span
              className="font-medium text-slate-100"
              animate={animatingCount ? { scale: [1, 1.2, 1] } : { scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {copyCount}
            </motion.span>
          </div>
        </div>
      </section>

      {linkCopied ? (
        <div className="rounded-2xl border border-emerald-500 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
          Link copied to clipboard.
        </div>
      ) : null}
    </div>
  );
}
