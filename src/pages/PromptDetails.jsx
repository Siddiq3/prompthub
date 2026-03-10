import { useMemo, useState } from "react";
import { FaBookmark, FaCopy, FaRegBookmark, FaShareAlt } from "react-icons/fa";
import { Link, Navigate, useParams } from "react-router-dom";
import AdSlot from "../components/AdSlot";
import Breadcrumbs from "../components/Breadcrumbs";
import ErrorState from "../components/ErrorState";
import LoadingSkeleton from "../components/LoadingSkeleton";
import PromptShelf from "../components/PromptShelf";
import SmartImage from "../components/SmartImage";
import { useAppContext } from "../context/AppContext";
import {
  buildCategoryPath,
  getPromptByParam,
  getRelatedPrompts,
  getSimilarPrompts
} from "../lib/content";
import { sharePromptLink } from "../lib/share";
import Seo from "../seo/Seo";
import { buildBreadcrumbSchema, buildItemListSchema } from "../seo/schema";

function InfoCard({ label, value }) {
  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-soft">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="mt-2 text-sm font-medium leading-7 text-brand-ink">{value || "-"}</p>
    </div>
  );
}

function PromptBlock({ title, value, onCopy, emphasis = false }) {
  return (
    <section
      className={`rounded-[2rem] border p-5 shadow-soft ${emphasis ? "border-brand-ink bg-brand-ink text-white" : "border-slate-200 bg-white"}`}
    >
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className={`font-heading text-2xl font-semibold ${emphasis ? "text-white" : "text-brand-ink"}`}>
          {title}
        </h2>
        <button
          type="button"
          onClick={onCopy}
          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/40 ${
            emphasis
              ? "border border-white/20 bg-white/10 text-white hover:bg-white/15"
              : "border border-slate-200 text-brand-ink hover:border-brand-accent hover:text-brand-accent"
          }`}
        >
          <FaCopy />
          Copy
        </button>
      </div>
      <pre
        className={`overflow-x-auto whitespace-pre-wrap break-words rounded-[1.5rem] p-4 font-mono text-sm leading-7 ${
          emphasis ? "bg-white/10 text-white" : "bg-slate-50 text-slate-700"
        }`}
      >
        {value || "No text available"}
      </pre>
    </section>
  );
}

function PromptDetails() {
  const { slug } = useParams();
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
    copyFullPrompt,
    notify
  } = useAppContext();
  const prompt = getPromptByParam(prompts, slug);
  const relatedPrompts = useMemo(() => getRelatedPrompts(prompts, prompt, 6), [prompts, prompt]);
  const similarPrompts = useMemo(() => getSimilarPrompts(prompts, prompt, 6), [prompts, prompt]);
  const [copyState, setCopyState] = useState("");

  const flashCopy = (key) => {
    setCopyState(key);
    window.setTimeout(() => setCopyState(""), 1200);
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
        message="The requested prompt does not exist in the current dataset."
      />
    );
  }

  if (slug !== prompt.slug) {
    return <Navigate to={prompt.url} replace />;
  }

  const breadcrumbs = [
    { label: "Home", to: "/" },
    { label: "Prompts", to: "/prompts" },
    { label: prompt.category, to: buildCategoryPath(prompt.category) },
    { label: prompt.title, to: prompt.url }
  ];

  return (
    <>
      <Seo
        title={prompt.title}
        description={prompt.shortDescription}
        path={prompt.url}
        image={prompt.previewImage}
        type="article"
        schema={[
          buildBreadcrumbSchema(breadcrumbs),
          buildItemListSchema(relatedPrompts)
        ]}
      />

      <section className="space-y-8">
        <Breadcrumbs items={breadcrumbs} />

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(340px,0.9fr)]">
          <div className="space-y-5">
            <SmartImage
              src={prompt.previewImage}
              alt={prompt.title}
              title={prompt.title}
              priority
              className="rounded-[2rem] border border-slate-200 shadow-lift"
              imageClassName="scale-[1.01]"
              aspectClassName="aspect-[5/4]"
              sizes="(min-width: 1280px) 50vw, 100vw"
            />
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              <InfoCard label="Category" value={prompt.category} />
              <InfoCard label="Model" value={prompt.modelLabel} />
              <InfoCard label="Aspect ratio" value={prompt.aspectRatio} />
              <InfoCard label="Created" value={prompt.formattedDate} />
              <InfoCard label="Copy count" value={`${copyCounts[prompt.id] || 0} copies`} />
              <InfoCard label="Tags" value={prompt.tags.join(", ")} />
            </div>
          </div>

          <div className="space-y-5">
            <div className="rounded-[2rem] border border-slate-200 bg-white/95 p-6 shadow-soft sm:p-8">
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-accent">
                Prompt Detail
              </span>
              <h1 className="mt-3 font-heading text-4xl font-semibold tracking-tight text-brand-ink sm:text-5xl">
                {prompt.title}
              </h1>
              <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">{prompt.seoIntro}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => toggleSaved(prompt.id)}
                  className="inline-flex items-center gap-2 rounded-full bg-brand-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-ink/90"
                >
                  {savedPrompts.includes(prompt.id) ? <FaBookmark /> : <FaRegBookmark />}
                  {savedPrompts.includes(prompt.id) ? "Saved" : "Save prompt"}
                </button>
                <button
                  type="button"
                  onClick={() => sharePromptLink(prompt, notify)}
                  className="inline-flex items-center gap-2 rounded-full border border-brand-ink px-5 py-3 text-sm font-semibold text-brand-ink transition hover:bg-brand-ink hover:text-white"
                >
                  <FaShareAlt />
                  Share
                </button>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white/95 p-6 shadow-soft">
              <h2 className="font-heading text-2xl font-semibold text-brand-ink">Best for</h2>
              <div className="mt-4 flex flex-wrap gap-3">
                {prompt.bestFor.map((item) => (
                  <span
                    key={item.id}
                    className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600"
                  >
                    {item.label}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white/95 p-6 shadow-soft">
              <h2 className="font-heading text-2xl font-semibold text-brand-ink">How to use this prompt</h2>
              <ol className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                <li>1. Copy the main prompt and paste it into your preferred AI image model.</li>
                <li>2. Adjust styling, subject details, lens cues, or aspect ratio to match your creative brief.</li>
                <li>3. Test the negative prompt when available to improve consistency and remove unwanted artifacts.</li>
              </ol>
            </div>
          </div>
        </div>

        <PromptBlock
          title={copyState === "prompt" ? "Prompt copied" : "Main prompt"}
          value={prompt.prompt}
          onCopy={async () => {
            const copied = await copyPrompt(prompt);
            if (copied) flashCopy("prompt");
          }}
        />

        <PromptBlock
          title={copyState === "negative" ? "Negative prompt copied" : "Negative prompt"}
          value={prompt.negativePrompt}
          onCopy={async () => {
            const copied = await copyNegativePrompt(prompt);
            if (copied) flashCopy("negative");
          }}
        />

        <PromptBlock
          title={copyState === "full" ? "Full prompt copied" : "Full prompt package"}
          value={`Prompt:\n${prompt.prompt}\n\nNegative Prompt:\n${prompt.negativePrompt}`}
          onCopy={async () => {
            const copied = await copyFullPrompt(prompt);
            if (copied) flashCopy("full");
          }}
          emphasis
        />

        <AdSlot label="Inline detail-page ad placeholder after prompt content" variant="inline" />

        <section className="rounded-[2rem] border border-slate-200 bg-white/92 p-6 shadow-soft sm:p-8">
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-brand-ink">
            Related prompt metadata
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
            This prompt is categorized under{" "}
            <Link to={buildCategoryPath(prompt.category)} className="font-semibold text-brand-accent">
              {prompt.category}
            </Link>
            , uses <span className="font-semibold text-brand-accent">{prompt.modelLabel}</span>, and is
            formatted for a <span className="font-semibold text-brand-accent">{prompt.aspectRatio}</span>{" "}
            composition. Use the related sections below to continue exploring prompts with similar tags and
            visual intent.
          </p>
        </section>

        <PromptShelf
          title="Related prompts"
          description="These prompts share category, model, aspect ratio, or tag overlap with the current prompt."
          prompts={relatedPrompts}
        />

        <PromptShelf
          title={`More ${prompt.category.toLowerCase()} prompts`}
          description={`Continue browsing ${prompt.category.toLowerCase()} prompt ideas from the same category landing page.`}
          prompts={similarPrompts}
          linkTo={buildCategoryPath(prompt.category)}
          linkLabel={`More ${prompt.category}`}
        />
      </section>
    </>
  );
}

export default PromptDetails;
