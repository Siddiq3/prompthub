"use client";

import { useState } from "react";
import Link from "next/link";
import { FaBookmark, FaCheck, FaCopy, FaRegBookmark, FaArrowRight } from "react-icons/fa";
import { formatTagLabel } from "../lib/taxonomy";
import SmartImage from "./SmartImage";
import { motion, useAnimation, AnimatePresence } from "framer-motion";

function PromptCard({ prompt, priority = false, onSave, onCopy, savedPrompts = [] }) {
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);  const [imageLoading, setImageLoading] = useState(true);    const bookmarkControls = useAnimation();
  const isSaved = savedPrompts.includes(prompt.id);

  // Get visible tags (up to 3)
  const subjectTagSlugs = new Set((prompt.subjectTags || []).map((tag) => String(tag).trim().toLowerCase()));
  const orderedTags = [
    ...(prompt.subjectTags || []),
    ...((prompt.displayTags || []).filter((tag) => !subjectTagSlugs.has(String(tag).trim().toLowerCase())))
  ];
  const visibleTags = orderedTags.slice(0, 3);

  const promptText = prompt.prompt || prompt.promptText || prompt.shortDescription || "";

  // Truncate prompt text to 2 lines (approx 100 chars)
  const truncatedPrompt = promptText.length > 100 
    ? promptText.substring(0, 100) + "..." 
    : promptText;

  // Get AI platform badge
  const getToolBadge = () => {
    const platform = prompt.modelLabel || prompt.platform || "Unknown";
    const badgeStyles = {
      "Midjourney": "bg-[#7C3AED] text-white",
      "DALL-E": "bg-[#3B82F6] text-white",
      "Stable Diffusion": "bg-[#F97316] text-white",
      "Flux": "bg-[#10B981] text-white",
      "Adobe Firefly": "bg-[#F87171] text-white",
    };
    return badgeStyles[platform] || "bg-[#9CA3B8] text-white";
  };

  const handleCopy = async () => {
      const handleMouseEnter = () => {
        setHovered(true);
        bookmarkControls.start({ scale: [1, 1.2, 1], transition: { duration: 0.4, times: [0, 0.3, 1], ease: "easeOut" } });
      };
      const handleMouseLeave = () => {
        setHovered(false);
      };
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
    <Link href={`/prompt/${prompt.slug}`} className="block group">
      <motion.article
        className="group flex h-full flex-col overflow-hidden rounded-xl border bg-[#131729] shadow-lg hover:shadow-xl transition-all duration-300"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        initial={false}
        animate={hovered ? { borderColor: "#7C3AED", borderWidth: 1.5 } : { borderColor: "rgba(255,255,255,0.08)", borderWidth: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{ borderStyle: "solid" }}
      >
      {/* Image Container with Overlay */}
        <div className="relative aspect-[4/3] overflow-hidden bg-[#1C2240]">
          {/* Image */}
        <motion.div
          className="relative aspect-[4/3] overflow-hidden bg-[#1C2240]"
          initial={false}
          animate={hovered ? { scale: 1.05 } : { scale: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{ overflow: "hidden" }}
        >
          <div className="block w-full h-full">
            <SmartImage
              src={prompt.previewImage}
              alt={prompt.title}
              title={prompt.title}
              priority={priority}
              className="w-full h-full"
              imageClassName="w-full h-full object-cover"
              aspectClassName=""
            />
          </div>

        {/* AI Tool Badge - Top Left */}
        <div className={`absolute top-3 left-3 inline-block px-3 py-1 rounded-full text-xs font-bold ${getToolBadge()} shadow-lg`}>
          {prompt.modelLabel || prompt.platform || "AI Tool"}
        </div>

        {/* Save Button - Top Right */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onSave?.(prompt.id);
          }}
          className={`absolute top-3 right-3 p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full backdrop-blur-md transition-all duration-200 active:scale-95 ${
            isSaved
              ? "bg-[#EC4899]/90 text-white"
              : "bg-[rgba(0,0,0,0.4)] text-white hover:bg-[rgba(0,0,0,0.6)]"
          }`}
          aria-label={isSaved ? `Remove from saved prompts` : `Save prompt`}
        >
          {isSaved ? (
            <FaBookmark className="w-4 h-4" />
          ) : (
            <FaRegBookmark className="w-4 h-4" />
          )}
        </button>
          <motion.button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onSave?.(prompt.id);
            }}
            className={`absolute top-3 right-3 p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full backdrop-blur-md transition-all duration-200 active:scale-95 ${
              isSaved
                ? "bg-yellow-500/90 text-white"
                : "bg-white/20 dark:bg-slate-900/20 text-white hover:bg-white/40"
            }`}
            aria-label={isSaved ? `Remove from saved prompts` : `Save prompt`}
            animate={bookmarkControls}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            {isSaved ? (
              <FaBookmark className="w-4 h-4" />
            ) : (
              <FaRegBookmark className="w-4 h-4" />
            )}
          </motion.button>

        {/* Hover Overlay with CTA */}
        {hovered && (
        {hovered && (
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/60 flex items-center justify-center group">
            <div className="text-center transform transition-transform duration-200 group-hover:scale-105">
              <div className="inline-flex items-center gap-2 bg-white text-[#0B0E1A] px-6 py-3 rounded-lg font-semibold">
                View Full Prompt
                <FaArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* Title */}
        <div className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
          <h3 className="font-clash font-bold text-white line-clamp-2 hover:text-[#7C3AED] transition-colors">
            {prompt.title}
          </h3>
        </div>

        {/* Category Tag */}
        <div className="flex items-center gap-2">
          {prompt.category && (
            <Link
              href={`/category/${prompt.category.toLowerCase()}`}
              className="inline-block px-3 py-1 rounded-full bg-[#1C2240] text-xs font-medium text-[#7C3AED] hover:bg-[#7C3AED]/20 transition-colors w-fit"
            >
              {prompt.category}
            </Link>
          )}
        </div>

        {/* Prompt Text Preview */}
        <p className="text-sm text-[#9CA3B8] line-clamp-2 flex-1">
          {truncatedPrompt}
        </p>

        {/* Tags */}
        {visibleTags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {visibleTags.map((tag) => (
              <Link
                key={`${prompt.id}-${tag}`}
                href={`/prompts?tag=${encodeURIComponent(tag)}`}
                className="inline-block px-2 py-1 text-xs bg-[#1C2240] text-[#9CA3B8] rounded hover:bg-[#7C3AED]/20 hover:text-[#7C3AED] transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                #{formatTagLabel(tag)}
              </Link>
            ))}
          </div>
        )}

        {/* Copy Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleCopy();
          }}
          className={`w-full mt-auto flex items-center justify-center gap-2 px-4 py-3 min-h-[44px] rounded-lg font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
            copied
              ? "bg-emerald-600 text-white"
              : "bg-[#7C3AED] hover:bg-[#6D28D9] text-white"
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
      </motion.article>
    // ...existing code...
    // Add prefers-reduced-motion support for all motion components
    </Link>
  );
}

export default PromptCard;
