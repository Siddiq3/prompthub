import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBookmark, FaCheck, FaCopy, FaRegBookmark, FaShareAlt } from "react-icons/fa";
import { useAppContext } from "../context/AppContext";
import { buildCategoryPath, buildPromptsPathWithTag } from "../lib/content";
import { formatTagLabel } from "../lib/taxonomy";
import { sharePromptLink } from "../lib/share";
import SmartImage from "./SmartImage";

function PromptCard({ prompt, priority = false }) {
  const [copied, setCopied] = useState(false);
  const { savedPrompts, toggleSaved, copyPrompt, notify } = useAppContext();
  const isSaved = savedPrompts.includes(prompt.id);
  const subjectTagSlugs = new Set((prompt.subjectTags || []).map((tag) => String(tag).trim().toLowerCase()));
  const orderedTags = [
    ...(prompt.subjectTags || []),
    ...prompt.displayTags.filter((tag) => !subjectTagSlugs.has(String(tag).trim().toLowerCase()))
  ];
  const visibleTags = orderedTags.slice(0, 2);
  const hiddenTagCount = Math.max(0, orderedTags.length - visibleTags.length);

  const handleCopy = async () => {
    const success = await copyPrompt(prompt);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    }
  };

  return (
    <article className="group ui-card ui-card-hover flex h-full flex-col overflow-hidden">
      <Link to={prompt.url} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/35">
        <SmartImage
          src={prompt.previewImage}
          alt={prompt.title}
          title={prompt.title}
          priority={priority}
          className="rounded-none"
          imageClassName="group-hover:scale-[1.02]"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="space-y-3">
          <Link to={prompt.url} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/35">
            <h3 className="text-balance font-heading text-[1.2rem] font-semibold leading-tight tracking-tight text-brand-ink transition-colors duration-180 ease-smooth group-hover:text-brand-accent sm:text-[1.35rem]">
              {prompt.title}
            </h3>
          </Link>

          <div className="flex flex-wrap items-center gap-2">
            <Link to={buildCategoryPath(prompt.category)} className="ui-pill-accent">
              {prompt.category}
            </Link>
            <span className="text-xs font-medium text-slate-600">{prompt.modelLabel}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {visibleTags.map((tag) => (
            <Link key={`${prompt.id}-${tag}`} to={buildPromptsPathWithTag(tag)} className="ui-tag">
              {formatTagLabel(tag)}
            </Link>
          ))}
          {hiddenTagCount ? <span className="ui-tag">+{hiddenTagCount} more</span> : null}
        </div>

        <div className="soft-divider mt-auto" />

        <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto_auto_auto]">
          <button
            type="button"
            onClick={handleCopy}
            className={`inline-flex h-10 items-center justify-center gap-2 rounded-pill px-4 text-sm font-semibold text-white transition-all duration-180 ease-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/25 focus-visible:ring-offset-2 ${
              copied ? "bg-emerald-600 hover:bg-emerald-600" : "bg-brand-accent hover:bg-primary-dark"
            }`}
          >
            {copied ? <FaCheck className="text-emerald-100" /> : <FaCopy />}
            {copied ? "Copied" : "Copy"}
          </button>
          <Link to={prompt.url} className="ui-button-secondary h-10 px-4">
            Open
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
