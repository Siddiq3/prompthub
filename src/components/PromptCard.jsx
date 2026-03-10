import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBookmark, FaCheck, FaCopy, FaRegBookmark, FaShareAlt } from "react-icons/fa";
import { useAppContext } from "../context/AppContext";
import { sharePromptLink } from "../lib/share";
import SmartImage from "./SmartImage";

function PromptCard({ prompt, priority = false }) {
  const [copied, setCopied] = useState(false);
  const { copyCounts, savedPrompts, toggleSaved, copyPrompt, notify } = useAppContext();
  const isSaved = savedPrompts.includes(prompt.id);
  const copyCount = copyCounts[prompt.id] || 0;

  const handleCopy = async () => {
    const success = await copyPrompt(prompt);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    }
  };

  return (
    <article className="group overflow-hidden rounded-[1.9rem] border border-slate-200/90 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(253,253,252,0.96))] shadow-soft transition duration-300 hover:-translate-y-1.5 hover:border-brand-accent/25 hover:shadow-lift">
      <Link to={prompt.url} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/40">
        <SmartImage
          src={prompt.previewImage}
          alt={prompt.title}
          title={prompt.title}
          priority={priority}
          imageClassName="group-hover:scale-[1.03]"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#132238]/70 via-[#132238]/10 to-transparent" />
          <div className="absolute left-4 right-4 top-4 flex items-center justify-between gap-3">
            <span className="rounded-full bg-white/92 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-brand-ink shadow-sm">
              {prompt.category}
            </span>
            <span className="rounded-full bg-[#132238]/76 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white shadow-sm">
              {copyCount} copies
            </span>
          </div>
        </SmartImage>
      </Link>

      <div className="space-y-5 p-5 sm:p-6">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
            <span>{prompt.modelLabel}</span>
            <span>•</span>
            <span>{prompt.aspectRatio}</span>
          </div>
          <Link to={prompt.url} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/40">
            <h3 className="text-balance font-heading text-[1.75rem] font-semibold tracking-tight text-brand-ink transition group-hover:text-brand-accent">
              {prompt.title}
            </h3>
          </Link>
          <p className="text-sm leading-7 text-slate-600">{prompt.shortDescription}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {prompt.tags.slice(0, 4).map((tag) => (
            <span
              key={`${prompt.id}-${tag}`}
              className="rounded-full border border-slate-200/90 bg-slate-50/88 px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-slate-600"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-[minmax(0,1fr)_auto_auto]">
          <button
            type="button"
            onClick={handleCopy}
            className="col-span-2 inline-flex items-center justify-center gap-2 rounded-full bg-brand-ink px-4 py-3 text-sm font-semibold text-white transition hover:translate-y-[-1px] hover:bg-brand-ink/92 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/40 sm:col-span-1"
          >
            {copied ? <FaCheck className="text-emerald-300" /> : <FaCopy />}
            {copied ? "Copied" : "Copy prompt"}
          </button>
          <Link
            to={prompt.url}
            className="inline-flex items-center justify-center rounded-full border border-brand-ink/20 bg-white px-4 py-3 text-sm font-semibold text-brand-ink transition hover:border-brand-ink hover:bg-brand-ink hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/40"
          >
            View
          </Link>
          <button
            type="button"
            onClick={() => sharePromptLink(prompt, notify)}
            className="inline-flex h-[3rem] w-[3rem] items-center justify-center rounded-full border border-slate-200 bg-slate-50/75 text-slate-600 transition hover:border-brand-accent hover:text-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/40"
            aria-label={`Share ${prompt.title}`}
          >
            <FaShareAlt />
          </button>
          <button
            type="button"
            onClick={() => toggleSaved(prompt.id)}
            className="col-span-2 inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-slate-50/72 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:border-brand-accent hover:text-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/40 sm:col-span-1 sm:col-start-3 sm:row-start-2 sm:h-[3rem] sm:w-[3rem] sm:bg-white sm:px-0"
            aria-label={isSaved ? `Remove ${prompt.title} from saved prompts` : `Save ${prompt.title}`}
          >
            {isSaved ? <FaBookmark className="text-brand-accent" /> : <FaRegBookmark />}
            <span className="sm:hidden">{isSaved ? "Saved" : "Save"}</span>
          </button>
        </div>
      </div>
    </article>
  );
}

export default PromptCard;
