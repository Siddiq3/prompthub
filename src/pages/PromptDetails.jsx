import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft, FaBookmark, FaCopy, FaRegBookmark } from "react-icons/fa";
import { useAppContext } from "../context/AppContext";
import LoadingSkeleton from "../components/LoadingSkeleton";
import ErrorState from "../components/ErrorState";
import PromptCard from "../components/PromptCard";
import MasonryGrid from "../components/MasonryGrid";
import { getImageCandidates } from "../utils/imageUrl";

const getInitials = (title = "Prompt") =>
  title
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("") || "PP";

function InfoItem({ label, value }) {
  return (
    <div className="rounded-2xl border border-primary/10 bg-white/86 p-4 shadow-soft">
      <p className="text-xs uppercase tracking-[0.12em] text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-primary-dark">{value || "-"}</p>
    </div>
  );
}

function PromptBlock({ title, value, onCopy, primary = false, copied = false }) {
  return (
    <div
      className={`rounded-2xl border p-4 shadow-soft ${
        primary ? "border-primary-dark bg-primary-dark text-white" : "border-primary/10 bg-white/86"
      }`}
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className={`text-sm font-semibold ${primary ? "text-white" : "text-primary-dark"}`}>{title}</h3>
        <button
          type="button"
          onClick={onCopy}
          className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ${
            primary
              ? "border border-white/30 bg-white/15 text-white hover:bg-white/25"
              : "border border-blue-900 bg-white text-blue-900 hover:bg-blue-50"
          }`}
        >
          <FaCopy />
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre
        className={`overflow-x-auto whitespace-pre-wrap break-words rounded-xl p-4 font-mono text-sm leading-relaxed ${
          primary ? "bg-white/10 text-slate-100" : "bg-primary/5 text-ink/80"
        }`}
      >
        {value || "No text available"}
      </pre>
    </div>
  );
}

function PromptDetails() {
  const { id } = useParams();
  const [copyState, setCopyState] = useState({ prompt: false, negative: false, full: false });
  const [imageAttempt, setImageAttempt] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  const {
    prompts,
    loading,
    error,
    retryFetch,
    copyCounts,
    savedPrompts,
    toggleSaved,
    copyPrompt,
    copyNegativePrompt,
    copyFullPrompt
  } = useAppContext();

  const prompt = useMemo(
    () => prompts.find((item) => String(item.id) === String(id)),
    [prompts, id]
  );
  const imageCandidates = useMemo(() => getImageCandidates(prompt?.previewImage), [prompt?.previewImage]);
  const activeImage = imageCandidates[imageAttempt] || "";
  const hasImageCandidates = imageCandidates.length > 0;
  const isImageExhausted = hasImageCandidates && imageAttempt >= imageCandidates.length;
  const showSkeleton = hasImageCandidates && !imageLoaded && !isImageExhausted;
  const showFallbackInitials = !hasImageCandidates || isImageExhausted;

  useEffect(() => {
    setImageAttempt(0);
    setImageLoaded(false);
  }, [prompt?.id, prompt?.previewImage]);

  const similarPrompts = useMemo(() => {
    if (!prompt) return [];

    return prompts
      .filter((item) => {
        if (String(item.id) === String(prompt.id)) return false;
        const sameCategory = item.category === prompt.category;
        const hasTagOverlap = item.tags.some((tag) => prompt.tags.includes(tag));
        return sameCategory || hasTagOverlap;
      })
      .slice(0, 8);
  }, [prompt, prompts]);

  const triggerCopyState = (key) => {
    setCopyState((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setCopyState((prev) => ({ ...prev, [key]: false }));
    }, 1200);
  };

  if (loading) {
    return <LoadingSkeleton count={6} />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={retryFetch} />;
  }

  if (!prompt) {
    return (
      <ErrorState
        title="Prompt not found"
        message="The prompt ID does not exist in the current dataset."
      />
    );
  }

  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-xl border border-blue-900 bg-white px-4 py-2 text-sm font-semibold text-blue-900 transition hover:bg-blue-50 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
        >
          <FaArrowLeft />
          Back
        </Link>

        <button
          type="button"
          onClick={() => toggleSaved(prompt.id)}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-800 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
        >
          {savedPrompts.includes(prompt.id) ? <FaBookmark /> : <FaRegBookmark />}
          {savedPrompts.includes(prompt.id) ? "Saved" : "Save Prompt"}
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-3xl border border-primary/10 bg-white/90 shadow-lift">
            <div className="relative aspect-[4/3] w-full bg-slate-100">
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
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                    imageLoaded ? "opacity-100" : "opacity-0"
                  }`}
                />
              )}
              {showSkeleton && (
                <div className="skeleton-shimmer absolute inset-0 bg-slate-200 dark:bg-slate-700" />
              )}
              {showFallbackInitials && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 via-cyan-100 to-secondary/20 text-5xl font-black text-primary-dark">
                  {getInitials(prompt.title)}
                </div>
              )}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <InfoItem label="Category" value={prompt.category} />
            <InfoItem label="Model" value={prompt.model} />
            <InfoItem label="Aspect Ratio" value={prompt.aspectRatio} />
            <InfoItem label="Created" value={prompt.createdAt} />
            <InfoItem label="Copied" value={`${copyCounts[prompt.id] || 0} times`} />
            <InfoItem label="Tags" value={prompt.tags.join(", ") || "None"} />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="font-heading text-3xl font-bold tracking-tight text-primary-dark sm:text-4xl">
            {prompt.title}
          </h1>

          <PromptBlock
            title="Prompt"
            value={prompt.prompt}
            copied={copyState.prompt}
            onCopy={async () => {
              const success = await copyPrompt(prompt);
              if (success) triggerCopyState("prompt");
            }}
          />

          <PromptBlock
            title="Negative Prompt"
            value={prompt.negativePrompt}
            copied={copyState.negative}
            onCopy={async () => {
              const success = await copyNegativePrompt(prompt);
              if (success) triggerCopyState("negative");
            }}
          />

          <PromptBlock
            title="Full Prompt"
            value={`Prompt:\n${prompt.prompt || ""}\n\nNegative Prompt:\n${prompt.negativePrompt || ""}`}
            copied={copyState.full}
            primary
            onCopy={async () => {
              const success = await copyFullPrompt(prompt);
              if (success) triggerCopyState("full");
            }}
          />
        </div>
      </div>

      {similarPrompts.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-2xl font-bold text-primary-dark">Similar prompts</h2>
            <p className="text-sm text-slate-500">{similarPrompts.length} matches</p>
          </div>

          <MasonryGrid
            items={similarPrompts}
            renderItem={(item) => (
              <PromptCard
                prompt={item}
                copyCount={copyCounts[item.id] || 0}
                isSaved={savedPrompts.includes(item.id)}
                onCopy={() => copyPrompt(item)}
                onToggleSave={toggleSaved}
              />
            )}
          />
        </section>
      )}
    </section>
  );
}

export default PromptDetails;
