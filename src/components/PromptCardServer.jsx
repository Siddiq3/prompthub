import Link from "next/link";
import { formatTagLabel } from "../lib/taxonomy";

/**
 * Server-side prompt card for static pages
 * Pure static component - no interactive handlers
 */
export default function PromptCardServer({ prompt }) {
  if (!prompt) return null;

  // Truncate prompt text to 2 lines (approx 100 chars)
  const truncatedPrompt = prompt.promptText && prompt.promptText.length > 100 
    ? prompt.promptText.substring(0, 100) + "..." 
    : prompt.promptText || prompt.shortDescription || "";

  // Get AI platform badge styles
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

  // Get visible tags
  const subjectTagSlugs = new Set((prompt.subjectTags || []).map((tag) => String(tag).trim().toLowerCase()));
  const orderedTags = [
    ...(prompt.subjectTags || []),
    ...prompt.displayTags.filter((tag) => !subjectTagSlugs.has(String(tag).trim().toLowerCase()))
  ];
  const visibleTags = orderedTags.slice(0, 2);

  return (
    <Link href={`/prompt/${prompt.slug}`} className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-xl">
      <article className="flex flex-col h-full overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm hover:shadow-lg transition-all duration-300">
        {/* Image Container with 16:9 ratio */}
        <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-700">
          {prompt.previewImage && (
            <img
              src={prompt.previewImage}
              alt={prompt.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              loading="lazy"
            />
          )}

          {/* AI Tool Badge - Top Left */}
          <div className={`absolute top-3 left-3 inline-block px-3 py-1 rounded-full text-xs font-bold ${getToolBadge()} shadow-md`}>
            {prompt.modelLabel || prompt.platform || "AI Tool"}
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="text-center">
              <p className="text-white font-semibold text-sm flex items-center justify-center gap-2">
                View Full Prompt
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-1 flex-col gap-3 p-4">
          {/* Title */}
          <h3 className="font-semibold text-slate-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {prompt.title}
          </h3>

          {/* Category Tag */}
          <div className="flex items-center gap-2">
            {prompt.category && (
              <span className="inline-block px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300">
                {prompt.category}
              </span>
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
                <span
                  key={`${prompt.id}-${tag}`}
                  className="inline-block px-2 py-1 text-xs bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded"
                >
                  #{formatTagLabel(tag)}
                </span>
              ))}
            </div>
          )}

          {/* CTA Text */}
          <div className="mt-auto text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-700">
            Click to copy prompt
          </div>
        </div>
      </article>
    </Link>
  );
}
