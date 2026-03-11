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
    <article className="group ui-card ui-card-hover flex h-full flex-col overflow-hidden">
      <Link to={prompt.url} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/40">
        <SmartImage
          src={prompt.previewImage}
          alt={prompt.title}
          title={prompt.title}
          priority={priority}
          imageClassName="group-hover:scale-[1.025] group-hover:brightness-[1.03]"
        >
          <div className="absolute left-4 right-4 top-4 flex items-center justify-between gap-3">
            <span className="rounded-pill border border-white/80 bg-white/92 px-3 py-1.5 text-[0.72rem] font-semibold text-brand-ink shadow-sm backdrop-blur">
              {prompt.category}
            </span>
            <span className="rounded-pill border border-white/70 bg-white/88 px-3 py-1.5 text-[0.72rem] font-medium text-slate-600 shadow-sm backdrop-blur">
              {copyCount} copies
            </span>
          </div>
        </SmartImage>
      </Link>

      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2">
          <span className="ui-pill">{prompt.modelLabel}</span>
          <span className="ui-pill">{prompt.aspectRatio}</span>
        </div>

        <div className="space-y-3">
          <Link to={prompt.url} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/40">
            <h3 className="text-balance font-heading text-[1.35rem] font-semibold leading-tight tracking-tight text-brand-ink transition-colors duration-180 ease-smooth group-hover:text-brand-accent sm:text-[1.5rem]">
              {prompt.title}
            </h3>
          </Link>
          <p className="text-sm leading-7 text-slate-600">{prompt.shortDescription}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {prompt.tags.slice(0, 3).map((tag) => (
            <span key={`${prompt.id}-${tag}`} className="ui-tag">
              {tag}
            </span>
          ))}
        </div>

        <div className="soft-divider mt-auto" />

        <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto_auto_auto]">
          <button
            type="button"
            onClick={handleCopy}
            className={`inline-flex h-11 items-center justify-center gap-2 rounded-pill px-4 text-sm font-semibold text-white transition-all duration-180 ease-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/25 focus-visible:ring-offset-2 ${
              copied
                ? "bg-emerald-600 hover:bg-emerald-600"
                : "bg-brand-accent hover:-translate-y-0.5 hover:bg-primary-dark"
            }`}
          >
            {copied ? <FaCheck className="text-emerald-100" /> : <FaCopy />}
            {copied ? "Copied" : "Copy prompt"}
          </button>
          <Link
            to={prompt.url}
            className="ui-button-secondary h-11 px-4"
          >
            View
          </Link>
          <button
            type="button"
            onClick={() => sharePromptLink(prompt, notify)}
            className="ui-icon-button"
            aria-label={`Share ${prompt.title}`}
          >
            <FaShareAlt />
          </button>
          <button
            type="button"
            onClick={() => toggleSaved(prompt.id)}
            className={`ui-icon-button ${isSaved ? "border-indigo-100 bg-indigo-50 text-brand-accent" : ""}`}
            aria-label={isSaved ? `Remove ${prompt.title} from saved prompts` : `Save ${prompt.title}`}
          >
            {isSaved ? <FaBookmark /> : <FaRegBookmark />}
          </button>
        </div>
      </div>
    </article>
  );
}

export default PromptCard;
