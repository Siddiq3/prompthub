import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { getPromptBySlug, getPrompts } from "@/src/lib/data";
import { getRelatedPrompts } from "@/src/lib/content";
import { buildBreadcrumbSchema } from "@/src/seo/schema";
import { formatTagLabel } from "@/src/lib/taxonomy";
import { SITE_URL } from "@/src/config";
import Breadcrumbs from "@/src/components/Breadcrumbs";
import PromptCard from "@/src/components/PromptCard";
import PromptCopyButton from "@/src/components/PromptCopyButton";
import PromptShareBar from "@/src/components/PromptShareBar";
import Image from "next/image";

const modelColors = {
  "Midjourney": "bg-purple-600",
  "DALL-E": "bg-pink-600",
  "Stable Diffusion": "bg-blue-600",
  "Flux": "bg-orange-600",
  "Adobe Firefly": "bg-red-600",
};

const getToolInstructions = (modelLabel) => {
  const instructions = {
    "Midjourney": [
      "Open your Midjourney Discord server and navigate to the #general or #newbies channel.",
      "Type /imagine and paste the prompt when prompted.",
      "Wait for the image to generate, then upscale the best result with U1-U4.",
      "Use V1-V4 to create variations of the chosen image.",
      "Adjust aspect ratio with --ar and experiment with stylization values.",
    ],
    "DALL-E": [
      "Open chat.openai.com or dall-e.openai.com and choose image generation.",
      "Paste the prompt into the input field.",
      "Click Generate to create multiple variations.",
      "Refine the prompt and regenerate until the image matches your vision.",
      "Download the final image once you’re happy with the result.",
    ],
    "Stable Diffusion": [
      "Use an interface like Automatic1111, Replicate, or Hugging Face Spaces.",
      "Paste the prompt in the positive prompt field.",
      "Optionally add a negative prompt to remove unwanted elements.",
      "Set steps, sampler, and CFG scale, then click Generate.",
      "Save the best output and iterate if you want a different style.",
    ],
    "Flux": [
      "Visit flux.ai or use the Flux AI platform.",
      "Paste the prompt into the generation field.",
      "Click Generate and wait for the image to render.",
      "Adjust settings and regenerate if needed.",
      "Download the final image in high resolution.",
    ],
    "Adobe Firefly": [
      "Open Firefly in your browser or Creative Cloud app.",
      "Paste the prompt into the text generation field.",
      "Generate variations and select your favorite.",
      "Use Generative Fill or Expand to refine the image.",
      "Download the finished image in the desired format.",
    ],
  };
  return instructions[modelLabel] || instructions["Midjourney"];
};

export default async function PromptDetailsPage({ params }) {
  const prompt = await getPromptBySlug(params.slug);
  if (!prompt) notFound();

  const allPrompts = await getPrompts();
  const relatedPrompts = getRelatedPrompts(allPrompts, prompt, 6);
  const pageUrl = `${SITE_URL}/prompt/${prompt.slug}`;
  const promptText = prompt.prompt || prompt.text || "";
  const promptImage = prompt.previewImage || prompt.image;
  const promptModel = prompt.modelLabel || prompt.model || "AI model";
  const negativeTags = prompt.negativePrompt
    ? prompt.negativePrompt.split(",").map((tag) => tag.trim()).filter(Boolean)
    : [];
  const description =
    prompt.seoIntro ||
    `${prompt.title} is a ${prompt.category?.toLowerCase() || "photo"} prompt for ${promptModel}. Use it to generate polished AI imagery with vivid detail and strong composition.`;

  const breadcrumbs = [
    { label: "Home", to: "/" },
    { label: prompt.category || "Prompts", to: `/category/${encodeURIComponent((prompt.category || "prompts").toLowerCase())}` },
    { label: prompt.title, to: `/prompt/${prompt.slug}` },
  ];

  const tagItems = [prompt.category, prompt.modelLabel, ...(prompt.displayTags || [])].filter(Boolean);

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={breadcrumbs} />

      <header className="space-y-4 mb-10">
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900 dark:text-white">
          {prompt.title}
        </h1>
        <div className="flex flex-wrap items-center gap-3">
          <span className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold text-white ${modelColors[prompt.modelLabel] || "bg-slate-600"}`}>
            {prompt.modelLabel}
          </span>
          {prompt.aspectRatio && (
            <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
              {prompt.aspectRatio}
            </span>
          )}
          {prompt.category && (
            <Link
              href={`/category/${encodeURIComponent(prompt.category.toLowerCase())}`}
              className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-medium text-slate-700 hover:border-blue-500 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-blue-400 dark:hover:text-blue-300"
            >
              {prompt.category}
            </Link>
          )}
        </div>
      </header>

      {promptImage && (
        <section className="mb-12 overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div className="relative aspect-[16/9]">
            <Image
              src={promptImage}
              alt={prompt.title}
              fill
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="object-cover"
            />
          </div>
        </section>
      )}

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] mb-16">
        <div className="space-y-8">
          <section className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-sm dark:border-slate-700 dark:bg-slate-950">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">The prompt</p>
              </div>
              <div className="sm:shrink-0">
                <PromptCopyButton promptText={promptText} label="Copy prompt" />
              </div>
            </div>

            <div className="mt-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-xl p-4 font-mono text-sm leading-relaxed overflow-hidden w-full">
              <pre className="whitespace-pre-wrap break-words overflow-hidden w-full">
                {promptText}
              </pre>
            </div>

            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
              {promptText.length} characters · Generated for {promptModel}
            </p>
          </section>

          {negativeTags.length > 0 && (
            <section className="rounded-[2rem] border border-red-200 bg-red-50 p-6 dark:border-red-900 dark:bg-red-950/30">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Negative prompt</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {negativeTags.map((tag, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </section>
          )}

          {prompt.displayTags?.length > 0 && (
            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {tagItems.map((tag) => (
                  <Link
                    key={tag}
                    href={`/prompts?tag=${encodeURIComponent(tag)}`}
                    className="inline-flex items-center rounded-full border border-slate-200 bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 hover:border-blue-500 hover:bg-blue-600 hover:text-white dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-blue-400"
                  >
                    #{formatTagLabel(tag)}
                  </Link>
                ))}
              </div>
            </section>
          )}

          <section className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400 font-semibold">Resolution</p>
              <p className="mt-3 text-lg font-semibold text-slate-900 dark:text-white">
                {prompt.aspectRatio?.includes("16") ? "1920×1080 / 2048×1152" : "1024×1024 / 1536×1536"}
              </p>
            </div>
            <div className="rounded-[2rem] border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400 font-semibold">Steps</p>
              <p className="mt-3 text-lg font-semibold text-slate-900 dark:text-white">20–35</p>
            </div>
            <div className="rounded-[2rem] border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400 font-semibold">CFG scale</p>
              <p className="mt-3 text-lg font-semibold text-slate-900 dark:text-white">
                {prompt.modelLabel === "Stable Diffusion" ? "7–14" : "Auto / N/A"}
              </p>
            </div>
          </section>

          <section className="rounded-[2rem] border border-blue-200 bg-blue-50 p-6 dark:border-slate-700 dark:bg-slate-900">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">How to use this prompt</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">A quick start guide for {prompt.modelLabel}.</p>
            <ol className="mt-5 space-y-3">
              {getToolInstructions(prompt.modelLabel).map((instruction, index) => (
                <li key={index} className="flex gap-3 text-sm text-slate-700 dark:text-slate-300">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
                    {index + 1}
                  </span>
                  <span>{instruction}</span>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <aside className="space-y-4 sm:space-y-6">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-5 sm:p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Share this prompt</h3>
            <PromptShareBar title={prompt.title} slug={prompt.slug} />
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-5 sm:p-6 dark:border-slate-700 dark:bg-slate-950">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Prompt details</h3>
            <div className="space-y-4 text-sm text-slate-700 dark:text-slate-300">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">AI platform</dt>
                <dd className="mt-1 font-medium text-slate-900 dark:text-white">{prompt.modelLabel}</dd>
              </div>

              {prompt.category && (
                <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
                  <dt className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Category</dt>
                  <dd className="mt-1">
                    <Link
                      href={`/category/${encodeURIComponent(prompt.category.toLowerCase())}`}
                      className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {prompt.category}
                    </Link>
                  </dd>
                </div>
              )}

              {prompt.aspectRatio && (
                <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
                  <dt className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Aspect ratio</dt>
                  <dd className="mt-1 font-medium text-slate-900 dark:text-white">{prompt.aspectRatio}</dd>
                </div>
              )}
            </div>
          </div>

        </aside>
      </div>

      {relatedPrompts.length > 0 && (
        <section className="mb-16">
          <div className="mb-8">
            <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">More {prompt.category || "photo"} prompts</h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400">Related prompts you can try next.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPrompts.slice(0, 6).map((relatedPrompt) => (
              <PromptCard key={relatedPrompt.id} prompt={relatedPrompt} priority={false} />
            ))}
          </div>
        </section>
      )}

      <Script
        id="prompt-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildBreadcrumbSchema(breadcrumbs)),
        }}
      />

      <Script
        id="prompt-creativework-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: prompt.title,
            headline: prompt.title,
            description,
            url: pageUrl,
            image: prompt.previewImage ? [prompt.previewImage] : [],
            keywords: (prompt.displayTags || []).map((tag) => formatTagLabel(tag)).join(", "),
            author: {
              "@type": "Person",
              name: "PhotoPromptsHub",
            },
            publisher: {
              "@type": "Organization",
              name: "PhotoPromptsHub",
              url: SITE_URL,
            },
            inLanguage: "en",
            datePublished: prompt.createdAt || undefined,
          }),
        }}
      />
    </main>
  );
}
