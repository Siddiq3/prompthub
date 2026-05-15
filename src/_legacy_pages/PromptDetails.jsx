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
  buildPromptsPathWithTag,
  getPromptByParam,
  getRelatedPrompts,
  getSimilarPrompts
} from "../lib/content";
import { sharePromptLink } from "../lib/share";
import { formatTagLabel } from "../lib/taxonomy";
import Seo from "../seo/Seo";
import {
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildItemListSchema,
  buildWebPageSchema
} from "../seo/schema";

const formatHumanList = (items = []) => {
  const values = items.filter(Boolean);

  if (!values.length) return "";
  if (values.length === 1) return values[0];
  if (values.length === 2) return `${values[0]} and ${values[1]}`;

  return `${values.slice(0, -1).join(", ")}, and ${values[values.length - 1]}`;
};

const getPromptDescriptionParagraphs = (prompt) => {
  if (!prompt) return [];

  const tagSummary = formatHumanList(prompt.displayTags.slice(0, 4).map((tag) => formatTagLabel(tag)));
  const bestForSummary = formatHumanList(prompt.bestFor.slice(0, 4).map((item) => item.label));
  const negativePromptSummary = prompt.negativePrompt
    ? "The included negative prompt can help reduce distractions and keep the result cleaner."
    : "If you need more control, add your own negative prompt to cut down on unwanted artifacts or extra noise.";

  return [
    `${prompt.title} is a ${prompt.category.toLowerCase()} prompt for ${prompt.modelLabel} with a ${prompt.aspectRatio} frame in mind. It points the image toward ${tagSummary || "a clear visual direction"} and gives you something more useful than a short one-line idea.`,
    `This prompt is especially useful for ${bestForSummary || `${prompt.category.toLowerCase()} work`}. Start with the base wording, then adjust the subject, setting, wardrobe, color, or lighting to match your own project. ${negativePromptSummary}`
  ];
};

function InfoCard({ label, value }) {
  return (
    <div className="ui-card p-4">
      <p className="ui-meta">{label}</p>
      <p className="mt-2 text-sm font-semibold leading-7 text-brand-ink">{value || "-"}</p>
    </div>
  );
}

function PromptBlock({ title, value, onCopy, emphasis = false, description }) {
  return (
    <section className={`ui-card p-5 sm:p-6 ${emphasis ? "border-indigo-100 bg-indigo-50/70" : ""}`}>
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="font-heading text-[1.45rem] font-semibold tracking-tight text-brand-ink sm:text-[1.65rem]">
            {title}
          </h2>
          {description ? (
            <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">{description}</p>
          ) : null}
        </div>
        <button
          type="button"
          onClick={onCopy}
          className={emphasis ? "ui-button-primary h-11 px-4" : "ui-button-secondary h-11 px-4"}
        >
          <FaCopy />
          Copy
        </button>
      </div>
      <pre className={`ui-code-block ${emphasis ? "border-indigo-100 bg-white" : ""}`}>
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

  const isSaved = savedPrompts.includes(prompt.id);
  const negativePromptText = prompt.negativePrompt || "";
  const bestForSummary = formatHumanList(prompt.bestFor.map((item) => item.label));
  const promptDescriptionParagraphs = getPromptDescriptionParagraphs(prompt);
  const seoDescription = `${prompt.title} is a ${prompt.category.toLowerCase()} prompt for ${prompt.modelLabel}. Copy the main prompt${negativePromptText ? ", use the included negative prompt," : ""} and browse more ${prompt.category.toLowerCase()} ideas on PhotoPromptsHub.`;
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
        description={seoDescription}
        path={prompt.url}
        image={prompt.previewImage}
        type="article"
        schema={[
          buildWebPageSchema({
            title: prompt.title,
            description: seoDescription,
            path: prompt.url,
            type: "WebPage"
          }),
          buildArticleSchema({
            title: prompt.title,
            description: seoDescription,
            path: prompt.url,
            image: prompt.previewImage,
            datePublished: prompt.createdAt,
            keywords: [prompt.category, prompt.modelLabel, ...prompt.displayTags.slice(0, 6)]
          }),
          buildBreadcrumbSchema(breadcrumbs),
          buildItemListSchema(relatedPrompts)
        ]}
      />

      <section className="space-y-8">
        <Breadcrumbs items={breadcrumbs} />

        <section className="section-shell surface-subtle p-5 sm:p-8">
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.08fr)_minmax(340px,0.92fr)]">
            <div className="space-y-5">
              <SmartImage
                src={prompt.previewImage}
                alt={prompt.title}
                title={prompt.title}
                priority
                className="rounded-[1.75rem] border border-slate-200 shadow-panel"
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
              </div>
            </div>

            <div className="space-y-4">
              <div className="ui-card p-6 sm:p-8">
                <span className="section-kicker text-brand-accent">
                  Prompt Detail
                </span>
                <h1 className="mt-3 text-balance font-heading text-[2rem] font-semibold tracking-tight text-brand-ink sm:text-[3rem]">
                  {prompt.title}
                </h1>
                <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">{prompt.seoIntro}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {prompt.displayTags.slice(0, 6).map((tag) => (
                    <Link key={tag} to={buildPromptsPathWithTag(tag)} className="ui-tag">
                      {formatTagLabel(tag)}
                    </Link>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => toggleSaved(prompt.id)}
                    className={isSaved ? "ui-button-secondary border-indigo-100 bg-indigo-50 text-indigo-700" : "ui-button-primary"}
                  >
                    {isSaved ? <FaBookmark /> : <FaRegBookmark />}
                    {isSaved ? "Saved" : "Save prompt"}
                  </button>
                  <button
                    type="button"
                    onClick={() => sharePromptLink(prompt, notify)}
                    className="ui-button-secondary"
                  >
                    <FaShareAlt />
                    Share
                  </button>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="ui-card p-5">
                  <h2 className="font-heading text-2xl font-semibold tracking-tight text-brand-ink">Best for</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    This prompt is a good fit for {bestForSummary || "creative image work"} and gives you a solid base before you start making your own variations.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {prompt.bestFor.map((item) => (
                      <span key={item.id} className="ui-pill-accent">
                        {item.label}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="ui-card p-5">
                  <h2 className="font-heading text-2xl font-semibold tracking-tight text-brand-ink">How to use this prompt</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Keep the core subject, style cues, and framing on the first pass. Once the base image feels right, make smaller edits to shape the final result.
                  </p>
                  <ol className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                    <li>1. Copy the main prompt into your preferred image model or workflow.</li>
                    <li>2. Adjust styling, subject details, environment notes, or lens references to suit your brief.</li>
                    <li>
                      3. {negativePromptText
                        ? "Add the negative prompt if you want a cleaner result with fewer unwanted artifacts."
                        : "Add a custom negative prompt if you want tighter control over unwanted artifacts."}
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell surface-subtle p-6 sm:p-8">
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.12fr)_minmax(320px,0.88fr)]">
            <div>
              <span className="section-kicker text-brand-accent">Prompt Description</span>
              <h2 className="mt-3 text-balance font-heading text-[2rem] font-semibold tracking-tight text-brand-ink sm:text-[2.35rem]">
                What this prompt helps you create
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-7 text-slate-600 sm:text-base">
                {promptDescriptionParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="ui-card p-5 sm:p-6">
              <p className="ui-meta">Prompt snapshot</p>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Made for <span className="font-semibold text-slate-700">{prompt.modelLabel}</span>, filed under{" "}
                <span className="font-semibold text-slate-700">{prompt.category}</span>, and formatted for a{" "}
                <span className="font-semibold text-slate-700">{prompt.aspectRatio}</span> composition.
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Use this page when you want the full prompt text, the supporting negative prompt, and a few nearby ideas to keep the same visual direction going.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {prompt.displayTags.slice(0, 6).map((tag) => (
                  <Link key={`snapshot-${tag}`} to={buildPromptsPathWithTag(tag)} className="ui-tag">
                    {formatTagLabel(tag)}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-2">
          <PromptBlock
            title={copyState === "prompt" ? "Prompt copied" : "Main prompt"}
            value={prompt.prompt}
            description="Use this as your base prompt, then rewrite the small details to fit your subject, setting, or visual style."
            onCopy={async () => {
              const copied = await copyPrompt(prompt);
              if (copied) flashCopy("prompt");
            }}
          />

          <PromptBlock
            title={copyState === "negative" ? "Negative prompt copied" : "Negative prompt"}
            value={negativePromptText}
            description="Use this when you want to reduce noise, strange details, or styling choices that do not fit the image."
            onCopy={async () => {
              const copied = await copyNegativePrompt(prompt);
              if (copied) flashCopy("negative");
            }}
          />
        </div>

        <PromptBlock
          title={copyState === "full" ? "Full prompt copied" : "Full prompt package"}
          value={`Prompt:\n${prompt.prompt}\n\nNegative Prompt:\n${negativePromptText || "No negative prompt provided."}`}
          description="Copy everything together when you want the quickest starting point with both the main prompt and the supporting negative prompt."
          onCopy={async () => {
            const copied = await copyFullPrompt(prompt);
            if (copied) flashCopy("full");
          }}
          emphasis
        />

        <AdSlot label="Inline detail-page ad placeholder after prompt content" variant="inline" />

        <section className="section-shell surface-subtle p-6 sm:p-8">
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
            <div>
              <h2 className="font-heading text-3xl font-semibold tracking-tight text-brand-ink">
                Continue browsing from this prompt
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                This prompt is categorized under{" "}
                <Link to={buildCategoryPath(prompt.category)} className="font-semibold text-brand-accent">
                  {prompt.category}
                </Link>
                , uses <span className="font-semibold text-brand-accent">{prompt.modelLabel}</span>, and is
                formatted for a <span className="font-semibold text-brand-accent">{prompt.aspectRatio}</span>{" "}
                composition. Use the links here to continue exploring prompts with similar tags and visual intent.
              </p>
            </div>
            <div className="ui-card p-5">
              <p className="ui-meta">Discovery paths</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link to={buildCategoryPath(prompt.category)} className="ui-button-secondary">
                  More {prompt.category}
                </Link>
                <Link to="/prompts" className="ui-button-secondary">
                  Full archive
                </Link>
                {prompt.displayTags.slice(0, 3).map((tag) => (
                  <Link key={tag} to={buildPromptsPathWithTag(tag)} className="ui-tag">
                    {formatTagLabel(tag)}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <PromptShelf
          title="Related prompts"
          description="These prompts share the same category, model, tags, or general visual direction."
          prompts={relatedPrompts}
        />

        <PromptShelf
          title={`More ${prompt.category.toLowerCase()} prompts`}
          description={`Keep exploring more ${prompt.category.toLowerCase()} prompts from the same category page.`}
          prompts={similarPrompts}
          linkTo={buildCategoryPath(prompt.category)}
          linkLabel={`More ${prompt.category}`}
        />
      </section>
    </>
  );
}

export default PromptDetails;
