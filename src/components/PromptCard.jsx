"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaBookmark, FaRegBookmark, FaArrowRight } from "react-icons/fa";
import { formatTagLabel } from "../lib/taxonomy";
import SmartImage from "./SmartImage";
import { motion, useAnimation } from "framer-motion";

function PromptCard({ prompt, priority = false, onSave, savedPrompts = [] }) {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const bookmarkControls = useAnimation();
  const isSaved = savedPrompts.includes(prompt.id);

  const subjectTagSlugs = new Set((prompt.subjectTags || []).map((tag) => String(tag).trim().toLowerCase()));
  const orderedTags = [
    ...(prompt.subjectTags || []),
    ...((prompt.displayTags || []).filter((tag) => !subjectTagSlugs.has(String(tag).trim().toLowerCase())))
  ];
  const visibleTags = orderedTags.slice(0, 3);

  const promptText = prompt.prompt || prompt.promptText || prompt.shortDescription || "";
  const truncatedPrompt = promptText.length > 100 ? promptText.substring(0, 100) + "..." : promptText;

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

  const handleMouseEnter = () => {
    setHovered(true);
    bookmarkControls.start({ scale: [1, 1.1, 1], transition: { duration: 0.4, ease: "easeOut" } });
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <article
      className="group cursor-pointer flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-[#131729] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => router.push(`/prompt/${prompt.slug}`)}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#1C2240]">
        <motion.div
          className="absolute inset-0 transition-transform duration-300 ease-out"
          animate={hovered ? { scale: 1.05 } : { scale: 1 }}
        >
          <SmartImage
            src={prompt.previewImage}
            alt={prompt.title}
            title={prompt.title}
            priority={priority}
            className="w-full h-full"
            imageClassName="w-full h-full object-cover"
            aspectClassName=""
            onLoadingComplete={() => setImageLoading(false)}
          />
        </motion.div>

        <div className={`absolute top-3 left-3 inline-block px-3 py-1 rounded-full text-xs font-bold ${getToolBadge()} shadow-lg`}>
          {prompt.modelLabel || prompt.platform || "AI Tool"}
        </div>

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
          {isSaved ? <FaBookmark className="w-4 h-4" /> : <FaRegBookmark className="w-4 h-4" />}
        </button>

        {hovered && (
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/70 flex items-center justify-center px-4">
            <div className="inline-flex items-center gap-2 rounded-3xl border border-white/10 bg-white/10 px-5 py-3 text-sm text-white shadow-xl backdrop-blur transition-transform duration-200">
              <span>Open Prompt</span>
              <FaArrowRight className="h-4 w-4" />
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <Link
          href={`/prompt/${prompt.slug}`}
          prefetch={true}
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          aria-label={`Open ${prompt.title}`}
        >
          <h3 className="font-clash font-bold text-white line-clamp-2 hover:text-[#7C3AED] transition-colors">
            {prompt.title}
          </h3>
        </Link>

        <div className="flex items-center gap-2">
          {prompt.category && (
            <Link
              href={`/category/${prompt.category.toLowerCase()}`}
              onClick={(e) => e.stopPropagation()}
              className="inline-block px-3 py-1 rounded-full bg-[#1C2240] text-xs font-medium text-[#7C3AED] hover:bg-[#7C3AED]/20 transition-colors"
            >
              {prompt.category}
            </Link>
          )}
        </div>

        <p className="text-sm text-[#9CA3B8] line-clamp-2 flex-1">
          {truncatedPrompt}
        </p>

        {visibleTags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {visibleTags.map((tag) => (
              <Link
                key={`${prompt.id}-${tag}`}
                href={`/prompts?tag=${encodeURIComponent(tag)}`}
                onClick={(e) => e.stopPropagation()}
                className="inline-block px-2 py-1 text-xs bg-[#1C2240] text-[#9CA3B8] rounded hover:bg-[#7C3AED]/20 hover:text-[#7C3AED] transition-colors"
              >
                #{formatTagLabel(tag)}
              </Link>
            ))}
          </div>
        )}

        <div className="mt-auto">
          <Link
            href={`/prompt/${prompt.slug}`}
            prefetch={true}
            aria-label={`Open ${prompt.title}`}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#7C3AED] px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <span className="hidden sm:inline">Open Prompt</span>
            <span className="sm:hidden">Open</span>
            <FaArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default PromptCard;
