import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPromptBySlug, getPrompts } from "@/src/lib/data";
import { getRelatedPrompts } from "@/src/lib/content";
import { getApprovalNotice, isHumanApprovedContent } from "@/src/lib/contentApproval";
import { PromptCopyButton, ShareButtons } from "@/src/components/PromptArticleActions";
import { SITE_URL } from "@/src/config";
import { formatDate } from "@/src/utils/prompts";

export const revalidate = 3600;

const cleanText = (value) => (typeof value === "string" ? value.trim() : "");

const cleanTextArray = (items = []) =>
  Array.isArray(items)
    ? items.map((item) => cleanText(item)).filter(Boolean)
    : [];

const cleanFaqItems = (items = []) =>
  Array.isArray(items)
    ? items
        .filter((item) => item && (item.question || item.answer))
        .map((item) => ({
          question: cleanText(item.question),
          answer: cleanText(item.answer),
        }))
        .filter((item) => item.question && item.answer)
    : [];

const countWords = (items = []) =>
  items
    .filter(Boolean)
    .join(" ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

const ASPECT_RATIO_CLASSES = {
  "1:1": "aspect-square",
  "4:3": "aspect-[4/3]",
  "3:4": "aspect-[3/4]",
  "4:5": "aspect-[4/5]",
  "16:9": "aspect-video",
  "9:16": "aspect-[9/16]",
  "3:2": "aspect-[3/2]",
  "2:3": "aspect-[2/3]",
  "21:9": "aspect-[21/9]",
};

const getAspectRatioClass = (aspectRatio, fallback = "aspect-[4/5]") => {
  const normalized = String(aspectRatio || "").replace(/\s+/g, "");
  return ASPECT_RATIO_CLASSES[normalized] || fallback;
};

function getExplicitRelatedPrompts(allPrompts, prompt, limit = 3) {
  const relatedKeys = Array.isArray(prompt.relatedSlugs) ? prompt.relatedSlugs : [];
  const explicit = relatedKeys
    .map((key) => allPrompts.find((item) => item.slug === key || item.id === key))
    .filter(Boolean);
  const fallback = getRelatedPrompts(allPrompts, prompt, limit).filter(
    (item) => !explicit.some((related) => related.id === item.id)
  );

  return [...explicit, ...fallback].slice(0, limit);
}

export default async function PromptDetailsPage({ params }) {
  const { slug } = params;
  const prompt = await getPromptBySlug(slug);

  if (!prompt) notFound();

  const allPrompts = await getPrompts();
  const relatedPrompts = getExplicitRelatedPrompts(allPrompts, prompt, 3);
  const canonicalBase = process.env.NEXT_PUBLIC_SITE_URL || SITE_URL || "https://photopromptshub.in";
  const pageUrl = `${canonicalBase}/prompt/${prompt.slug}`;

  const title = prompt.title;
  const category = prompt.category || "AI Prompts";
  const author = prompt.author || "SiddiqKolimi";
  const updatedAt = prompt.updatedAt || prompt.createdAt;
  const badges = Array.isArray(prompt.badges) ? prompt.badges : [];
  const hasApprovedEditorial = isHumanApprovedContent(prompt);
  const compatibleModels =
    Array.isArray(prompt.compatibleModels) && prompt.compatibleModels.length
      ? prompt.compatibleModels
      : [prompt.modelLabel || prompt.model || "AI model"];
  const intro = hasApprovedEditorial ? cleanText(prompt.intro || prompt.seoIntro) : "";
  const aboutParagraphs = hasApprovedEditorial ? cleanTextArray(prompt.about_paragraphs) : [];
  const whatIsParagraph = hasApprovedEditorial ? cleanText(prompt.what_is_paragraph) : "";
  const whatIsClosingParagraph = hasApprovedEditorial ? cleanText(prompt.what_is_closing_paragraph) : "";
  const promptText = cleanText(prompt.prompt);
  const negativePrompt = cleanText(prompt.negativePrompt);
  const howToSteps = hasApprovedEditorial ? cleanTextArray(prompt.howToSteps) : [];
  const tips = hasApprovedEditorial ? cleanTextArray(prompt.tips?.length ? prompt.tips : prompt.prompt_tips) : [];
  const whoIsItFor = hasApprovedEditorial ? cleanText(prompt.who_is_it_for) : "";
  const howItWorks = hasApprovedEditorial ? cleanText(prompt.how_it_works) : "";
  const approvedFaqItems = hasApprovedEditorial
    ? cleanFaqItems(prompt.faqItems).length
      ? cleanFaqItems(prompt.faqItems)
      : cleanFaqItems(prompt.faq)
    : [];
  const faqItems = approvedFaqItems;
  const tags = cleanTextArray(prompt.tags);
  const displayTags = cleanTextArray(prompt.displayTags);
  const imageAspectClass = getAspectRatioClass(prompt.aspectRatio);
  const renderedWordCount = countWords([
    title,
    intro,
    ...aboutParagraphs,
    whatIsParagraph,
    whatIsClosingParagraph,
    promptText,
    negativePrompt,
    ...howToSteps,
    ...tips,
    whoIsItFor,
    howItWorks,
    ...faqItems.flatMap((item) => [item.question, item.answer]),
  ]);
  const readMinutes = Math.max(1, Math.ceil(renderedWordCount / 200));
  return (
    <main className="bg-white text-slate-900">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,0.68fr)_minmax(280px,0.3fr)] lg:px-8">
        <article className="min-w-0 space-y-10">
          <nav aria-label="breadcrumb" className="text-sm text-slate-500">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-slate-900">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href={`/category/${encodeURIComponent(String(category).toLowerCase())}`} className="hover:text-slate-900">
                  {category}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-slate-700">{title}</li>
            </ol>
          </nav>

          <header className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(260px,360px)] lg:items-start">
            <div className="space-y-5">
              <h1 className="text-4xl font-bold leading-tight text-slate-950 sm:text-5xl">{title}</h1>
              <p className="text-sm leading-6 text-slate-500">
                {author} · Updated {updatedAt ? formatDate(updatedAt) : "recently"} · {category} · {readMinutes} min read
              </p>
              <p className="inline-flex w-fit rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
                {getApprovalNotice(prompt)}
              </p>

              {badges.length ? (
                <div className="flex flex-wrap gap-2">
                  {badges.map((badge, index) => (
                    <span key={`${badge.label || badge}-${index}`} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
                      {badge.label || badge}
                    </span>
                  ))}
                </div>
              ) : null}

              <p className="text-sm font-semibold text-slate-700">
                Works with: {compatibleModels.join(" · ")}
              </p>
            </div>

            <div className={`relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 ${imageAspectClass}`}>
              {prompt.previewImage ? (
                <Image
                  src={prompt.previewImage}
                  alt={title}
                  fill
                  loading="lazy"
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 360px"
                />
              ) : null}
            </div>
          </header>

          {(intro || aboutParagraphs.length) ? (
            <section className="space-y-5 text-base leading-8 text-slate-700">
              {intro ? <p>{intro}</p> : null}
              {aboutParagraphs.map((paragraph, index) => (
                <p key={`about-${index}`}>{paragraph}</p>
              ))}
            </section>
          ) : null}

          {(whatIsParagraph || whatIsClosingParagraph) ? (
            <section className="space-y-5 text-base leading-8 text-slate-700">
              <h2 className="text-3xl font-bold leading-tight text-slate-950">What is {title}?</h2>
              {whatIsParagraph ? <p>{whatIsParagraph}</p> : null}
              {whatIsClosingParagraph ? <p>{whatIsClosingParagraph}</p> : null}
            </section>
          ) : null}

          <section className="space-y-5">
            <h2 className="text-3xl font-bold leading-tight text-slate-950">The Prompt</h2>
            <div className="flex flex-wrap gap-2">
              {prompt.aspectRatio ? (
                <span className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700">
                  Aspect ratio: {prompt.aspectRatio}
                </span>
              ) : null}
              {prompt.model ? (
                <span className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700">
                  Best for: {prompt.model}
                </span>
              ) : null}
            </div>
            <div className="relative rounded-lg border border-slate-200 border-l-violet-600 border-l-4 bg-slate-50 p-4 pt-14">
              <PromptCopyButton text={promptText} />
              <pre className="whitespace-pre-wrap break-words font-mono text-sm leading-7 text-slate-800">{promptText}</pre>
            </div>
            {negativePrompt ? (
              <details className="rounded-lg border border-slate-200 bg-white p-4">
                <summary className="cursor-pointer text-sm font-semibold text-slate-900">Negative prompt (optional)</summary>
                <p className="mt-4 whitespace-pre-wrap break-words font-mono text-sm leading-7 text-slate-700">{negativePrompt}</p>
              </details>
            ) : null}
          </section>

          {howToSteps.length ? (
            <section className="space-y-5">
              <h2 className="text-3xl font-bold leading-tight text-slate-950">How to use this prompt</h2>
              <ol className="list-decimal space-y-3 pl-5 text-base leading-8 text-slate-700">
                {howToSteps.map((step, index) => (
                  <li key={`step-${index}`}>{step}</li>
                ))}
              </ol>
            </section>
          ) : null}

          {tips.length ? (
            <section className="space-y-5">
              <h2 className="text-3xl font-bold leading-tight text-slate-950">Tips for better results</h2>
              <ul className="list-disc space-y-3 pl-5 text-base leading-8 text-slate-700">
                {tips.map((tip, index) => (
                  <li key={`tip-${index}`}>{tip}</li>
                ))}
              </ul>
            </section>
          ) : null}

          {whoIsItFor ? (
            <section className="space-y-5 text-base leading-8 text-slate-700">
              <h2 className="text-3xl font-bold leading-tight text-slate-950">Who is this prompt for?</h2>
              <p>{whoIsItFor}</p>
            </section>
          ) : null}

          {howItWorks ? (
            <section className="space-y-5 text-base leading-8 text-slate-700">
              <h2 className="text-3xl font-bold leading-tight text-slate-950">How this prompt works</h2>
              <p>{howItWorks}</p>
            </section>
          ) : null}

          {faqItems.length ? (
            <section className="space-y-5">
              <h2 className="text-3xl font-bold leading-tight text-slate-950">Frequently asked questions</h2>
              <div className="space-y-3">
                {faqItems.map((item, index) => (
                  <details key={`${item.question}-${index}`} className="group rounded-lg border border-slate-200 bg-white p-4 transition-all open:shadow-sm">
                    <summary className="cursor-pointer text-base font-semibold text-slate-900">{item.question}</summary>
                    <p className="mt-3 text-sm leading-7 text-slate-700">{item.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          ) : null}

          <div className="space-y-8 lg:hidden">
            {displayTags.length ? (
              <SidebarTags tags={displayTags} />
            ) : null}
            <SidebarShare title={title} url={pageUrl} />
          </div>

          {tags.length ? (
            <section className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tag/${encodeURIComponent(tag)}`}
                  className="rounded-full border border-slate-200 px-3 py-1 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
                >
                  {tag}
                </Link>
              ))}
            </section>
          ) : null}

          {relatedPrompts.length ? (
            <section className="space-y-5">
              <h2 className="text-3xl font-bold leading-tight text-slate-950">You might also like</h2>
              <div className="grid gap-5 sm:grid-cols-3">
                {relatedPrompts.map((item) => (
                  <Link key={item.id} href={`/prompt/${item.slug}`} className="group overflow-hidden rounded-lg border border-slate-200 bg-white transition hover:-translate-y-0.5 hover:shadow-lg">
                    <div className={`relative bg-slate-100 ${getAspectRatioClass(item.aspectRatio)}`}>
                      {item.previewImage ? (
                        <Image src={item.previewImage} alt={item.title} fill className="object-contain" sizes="(max-width: 768px) 100vw, 220px" />
                      ) : null}
                    </div>
                    <div className="space-y-2 p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{item.category}</p>
                      <h3 className="line-clamp-2 text-sm font-bold leading-6 text-slate-950">{item.title}</h3>
                      <span className="inline-flex text-sm font-semibold text-violet-700 group-hover:text-violet-900">View Prompt →</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-8">
            {displayTags.length ? <SidebarTags tags={displayTags} /> : null}
            <SidebarShare title={title} url={pageUrl} />
          </div>
        </aside>
      </div>
    </main>
  );
}

function SidebarTags({ tags }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5">
      <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-slate-500">Popular tags</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Link
            key={tag}
            href={`/tag/${encodeURIComponent(tag)}`}
            className="rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
          >
            {tag}
          </Link>
        ))}
      </div>
    </section>
  );
}

function SidebarShare({ title, url }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5">
      <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-slate-500">Share this prompt</h2>
      <div className="mt-4">
        <ShareButtons title={title} url={url} />
      </div>
    </section>
  );
}

export async function generateStaticParams() {
  const prompts = await getPrompts();
  return prompts.map((prompt) => ({
    slug: prompt.slug,
  }));
}
