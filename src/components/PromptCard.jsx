"use client";

import { useState } from "react";
import Link from "next/link";
import { FaBookmark, FaCheck, FaCopy, FaRegBookmark, FaArrowRight } from "react-icons/fa";
import { formatTagLabel } from "../lib/taxonomy";
import SmartImage from "./SmartImage";

function PromptCard({ prompt, priority = false, onSave, onCopy, savedPrompts = [] }) {
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);
  const isSaved = savedPrompts.includes(prompt.id);

  // Get visible tags (up to 2)
  const subjectTagSlugs = new Set((prompt.subjectTags || []).map((tag) => String(tag).trim().toLowerCase()));
  const orderedTags = [
    ...(prompt.subjectTags || []),
    ...prompt.displayTags.filter((tag) => !subjectTagSlugs.has(String(tag).trim().toLowerCase()))
  ];
  const visibleTags = orderedTags.slice(0, 2);

  const promptText = prompt.prompt || prompt.promptText || prompt.shortDescription || "";

  // Truncate prompt text to 2 lines (approx 100 chars)
  const truncatedPrompt = promptText.length > 100 
    ? promptText.substring(0, 100) + "..." 
    : promptText;

  // Get AI platform badge
  const getToolBadge = () => {
    const platform = prompt.modelLabel || prompt.platform || "Unknown";
    const badgeStyles = {
      "Midjourney": "bg-purple-600 text-white",
      "DALL-E": "bg-pink-600 text-white",
      "Stable Diffusion": "bg-blue-600 text-white",
      "Flux": "bg-orange-600 text-white",
      "Adobe Firefly": "bg-red-600 text-white",
    };
    return badgeStyles[platform] || "bg-slate-600 text-white";
  };

  const handleCopy = async () => {
    if (onCopy) {
      const success = await onCopy(prompt);
      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } else {
      // Fallback: copy to clipboard directly
      try {
        await navigator.clipboard.writeText(promptText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    }
  };

  return (
    <article 
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm hover:shadow-lg transition-all duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image Container with Overlay */}
      <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-700">
        {/* Image */}
        <Link href={`/prompt/${prompt.slug}`} className="block w-full h-full">
          <SmartImage
            src={prompt.previewImage}
            alt={prompt.title}
            title={prompt.title}
            priority={priority}
            className="w-full h-full"
            imageClassName="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            aspectClassName=""
          />
        </Link>

        {/* AI Tool Badge - Top Left */}
        <div className={`absolute top-3 left-3 inline-block px-3 py-1 rounded-full text-xs font-bold ${getToolBadge()} shadow-md`}>
          {prompt.modelLabel || prompt.platform || "AI Tool"}
        </div>

        {/* Save Button - Top Right */}
        <button
          type="button"
          onClick={() => onSave?.(prompt.id)}
          className={`absolute top-3 right-3 p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full backdrop-blur-md transition-all duration-200 active:scale-95 ${
            isSaved
              ? "bg-yellow-500/90 text-white"
              : "bg-white/20 dark:bg-slate-900/20 text-white hover:bg-white/40"
          }`}
          aria-label={isSaved ? `Remove from saved prompts` : `Save prompt`}
        >
          {isSaved ? (
            <FaBookmark className="w-4 h-4" />
          ) : (
            <FaRegBookmark className="w-4 h-4" />
          )}
        </button>

        {/* Hover Overlay with CTA */}
        {hovered && (
          <Link
            href={`/prompt/${prompt.slug}`}
            className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/60 flex items-center justify-center group"
          >
            <div className="text-center transform transition-transform duration-200 group-hover:scale-105">
              <button className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-slate-100 transition-colors">
                View Full Prompt
                <FaArrowRight className="w-4 h-4" />
              </button>
            </div>
          </Link>
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* Title */}
        <Link href={`/prompt/${prompt.slug}`} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
          <h3 className="font-semibold text-slate-900 dark:text-white line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {prompt.title}
          </h3>
        </Link>

        {/* Category Tag */}
        <div className="flex items-center gap-2">
          {prompt.category && (
            <Link
              href={`/category/${prompt.category.toLowerCase()}`}
              className="inline-block px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            >
              {prompt.category}
            </Link>
          )}
        </div>

        {/* Prompt Text Preview */}
        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 flex-1">
          {truncatedPrompt}
        </p>

        {/* Tags */}
        {visibleTags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {visibleTags.map((tag) => (
              <Link
                key={`${prompt.id}-${tag}`}
                href={`/prompts?tag=${encodeURIComponent(tag)}`}
                className="inline-block px-2 py-1 text-xs bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              >
                #{formatTagLabel(tag)}
              </Link>
            ))}
          </div>
        )}

        {/* Copy Button */}
        <button
          type="button"
          onClick={handleCopy}
          className={`w-full mt-auto flex items-center justify-center gap-2 px-4 py-3 min-h-[44px] rounded-lg font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-95 ${
            copied
              ? "bg-emerald-500 text-white focus-visible:ring-emerald-300"
              : "bg-blue-600 hover:bg-blue-700 text-white focus-visible:ring-blue-300"
          }`}
        >
          {copied ? (
            <>
              <FaCheck className="w-4 h-4" />
              Copied!
            </>
          ) : (
            <>
              <FaCopy className="w-4 h-4" />
              Copy Prompt
            </>
          )}
        </button>
      </div>
    </article>
  );
}

export default PromptCard;
