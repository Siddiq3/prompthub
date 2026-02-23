import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaBookmark, FaCheck, FaCopy, FaExpand, FaRegBookmark } from "react-icons/fa";
import { getImageCandidates } from "../utils/imageUrl";

const getInitials = (title = "Prompt") =>
  title
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("") || "PP";

function PromptCard({ prompt, copyCount, isSaved, onCopy, onToggleSave }) {
  const [imageAttempt, setImageAttempt] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [copied, setCopied] = useState(false);

  const fallbackLabel = useMemo(() => getInitials(prompt.title), [prompt.title]);
  const imageCandidates = useMemo(() => getImageCandidates(prompt.previewImage), [prompt.previewImage]);
  const activeImage = imageCandidates[imageAttempt] || "";
  const hasImageCandidates = imageCandidates.length > 0;
  const isImageExhausted = hasImageCandidates && imageAttempt >= imageCandidates.length;
  const showSkeleton = hasImageCandidates && !imageLoaded && !isImageExhausted;
  const showFallbackInitials = !hasImageCandidates || isImageExhausted;

  useEffect(() => {
    setImageAttempt(0);
    setImageLoaded(false);
  }, [prompt.id, prompt.previewImage]);

  const handleCopy = async () => {
    const success = await onCopy(prompt);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    }
  };

  return (
    <article className="group relative isolate overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white transition duration-300 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-white dark:border-slate-700 dark:bg-slate-900 dark:hover:border-blue-400">
      <div className="relative aspect-[4/3] w-full bg-slate-100 dark:bg-slate-800">
        {activeImage && (
          <img
            src={activeImage}
            alt={prompt.title}
            loading="lazy"
            decoding="async"
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setImageLoaded(false);
              setImageAttempt((prev) => prev + 1);
            }}
            className={`absolute inset-0 z-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.035] ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        {showSkeleton && <div className="skeleton-shimmer absolute inset-0 z-0 bg-slate-200 dark:bg-slate-700" />}

        {showFallbackInitials && (
          <div className="absolute inset-0 z-0 flex items-center justify-center bg-gradient-to-br from-brand-secondary/20 via-white to-brand-accent/20 text-2xl font-semibold text-brand-primary dark:via-slate-900 dark:text-slate-100">
            {fallbackLabel}
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[#162f5e]/82 via-[#1f3b73]/32 to-transparent" />

        <div className="absolute left-3 right-3 top-3 z-20 flex items-center justify-between">
          <span className="rounded-full border border-white/35 bg-primary-dark/35 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
            {prompt.category}
          </span>
          <span className="rounded-full border border-white/35 bg-primary-dark/35 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
            {copyCount} copies
          </span>
        </div>

        <div className="absolute right-3 top-12 z-30 hidden gap-2 group-hover:flex">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/45 bg-primary-dark/45 text-white transition hover:bg-primary-dark/60 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label={`Copy ${prompt.title}`}
          >
            {copied ? <FaCheck className="text-emerald-300" /> : <FaCopy />}
          </button>
          <button
            type="button"
            onClick={() => onToggleSave(prompt.id)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/45 bg-primary-dark/45 text-white transition hover:bg-primary-dark/60 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label={isSaved ? `Unsave ${prompt.title}` : `Save ${prompt.title}`}
          >
            {isSaved ? <FaBookmark className="text-secondary-light" /> : <FaRegBookmark />}
          </button>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-20 p-4 text-white">
          <h3 className="font-heading text-lg font-semibold leading-tight tracking-tight">{prompt.title}</h3>

          <div className="mt-2 flex flex-wrap gap-2">
            {prompt.tags.slice(0, 3).map((tag) => (
              <span
                key={`${prompt.id}-${tag}`}
                className="rounded-full border border-white/35 bg-primary-dark/28 px-2 py-1 text-xs text-white/95 backdrop-blur"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-blue-200 bg-white/95 px-3 py-2 text-sm font-semibold text-blue-900 transition hover:bg-blue-50 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 dark:border-blue-700 dark:bg-slate-900/95 dark:text-blue-200 dark:hover:bg-slate-800"
            >
              {copied ? <FaCheck className="text-emerald-500" /> : <FaCopy />}
              {copied ? "Copied" : "Copy"}
            </button>

            <Link
              to={`/prompt/${prompt.id}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-800 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
            >
              <FaExpand />
              Details
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default PromptCard;
