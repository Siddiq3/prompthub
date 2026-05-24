import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatTagLabel } from "../lib/taxonomy";

/**
 * Server-side prompt card for static pages
 * Pure static component - no interactive handlers
 */
export default function PromptCardServer({ prompt }) {
  if (!prompt) return null;

  const truncatedPrompt = prompt.promptText && prompt.promptText.length > 100 
    ? prompt.promptText.substring(0, 100) + "..." 
    : prompt.promptText || prompt.shortDescription || "";

  const getToolBadge = () => {
    const platform = prompt.modelLabel || prompt.platform || "Unknown";
    const badgeStyles = {
      ChatGPT: "bg-emerald-600 text-white",
      Gemini: "bg-sky-600 text-white",
    };
    return badgeStyles[platform] || "bg-slate-600 text-white";
  };

  const subjectTagSlugs = new Set((prompt.subjectTags || []).map((tag) => String(tag).trim().toLowerCase()));
  const orderedTags = [
    ...(prompt.subjectTags || []),
    ...prompt.displayTags.filter((tag) => !subjectTagSlugs.has(String(tag).trim().toLowerCase()))
  ];
  const visibleTags = orderedTags.slice(0, 2);

  return (
    <Link href={`/prompt/${prompt.slug}`} prefetch={true} className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-xl">
      <article className="flex flex-col h-full overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
        <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-700">
          {prompt.previewImage && (
            <Image
              src={prompt.previewImage}
              alt={prompt.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          )}

          <div className={`absolute top-3 left-3 inline-block px-3 py-1 rounded-full text-xs font-bold ${getToolBadge()} shadow-md`}>
            {prompt.modelLabel || prompt.platform || "AI Tool"}
          </div>

          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="text-center">
              <p className="text-white font-semibold text-sm flex items-center justify-center gap-2">
                Open Prompt
                <ArrowRight className="w-4 h-4" />
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-4">
          <h3 className="font-semibold text-slate-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {prompt.title}
          </h3>

          <div className="flex items-center gap-2">
            {prompt.category && (
              <span className="inline-block px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300">
                {prompt.category}
              </span>
            )}
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 flex-1">
            {truncatedPrompt}
          </p>

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

          <div className="mt-auto border-t border-slate-200 dark:border-slate-700 pt-4">
            <span className="inline-flex items-center gap-2 rounded-2xl bg-slate-900/90 px-4 py-3 text-sm font-semibold text-white transition-all duration-200 group-hover:bg-blue-600">
              <span className="hidden sm:inline">Open Prompt</span>
              <span className="sm:hidden">Open</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
