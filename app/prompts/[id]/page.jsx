import { notFound } from "next/navigation";
import Script from "next/script";
import Link from "next/link";
import Image from "next/image";
import { getPromptById, getPrompts } from "@/src/lib/data";
import { getRelatedPrompts } from "@/src/lib/content";
import { SITE_URL } from "@/src/config";
import PromptCard from "@/src/components/PromptCard";
import PromptCopyButton from "@/src/components/PromptCopyButton";
import { PromptActionsPanel } from "./client";

const modelColors = {
  Midjourney: "bg-purple-600",
  "DALL-E": "bg-pink-600",
  "Stable Diffusion": "bg-blue-600",
  Flux: "bg-orange-600",
  "Adobe Firefly": "bg-red-600",
};

export default async function PromptDetailPage({ params }) {
  const prompt = await getPromptById(params.id);

  if (!prompt) {
    notFound();
  }

  const allPrompts = await getPrompts();
  const relatedPrompts = prompt.category 
    ? getRelatedPrompts(allPrompts, prompt, 4)
    : allPrompts.filter(p => p.id !== prompt.id).slice(0, 4);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Prompts", href: "/prompts" },
    { label: prompt.title, href: `/prompts/${prompt.id}` },
  ];

  const modelColor = modelColors[prompt.model] || "bg-slate-600";
  const promptText = prompt.prompt || "";
  const negativePromptText = prompt.negativePrompt || "";
  const negativeTags = negativePromptText
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: prompt.title,
    description: promptText,
    tool: {
      "@type": "Thing",
      name: prompt.model,
    },
    step: [
      {
        "@type": "HowToStep",
        text: `Copy this prompt and paste it into ${prompt.model}.`,
      },
      {
        "@type": "HowToStep",
        text: `Adjust settings and generate your image using ${prompt.model}.`,
      },
    ],
  };

  return (
    <>
      <Script
        id="prompt-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <Link href="/" className="hover:text-slate-900 dark:hover:text-white">Home</Link>
          <span>/</span>
          <Link href="/prompts" className="hover:text-slate-900 dark:hover:text-white">Prompts</Link>
          <span>/</span>
          <span className="text-slate-900 dark:text-white truncate">{prompt.title}</span>
        </nav>

        {/* Main Content */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column: Image & Metadata */}
          <div className="lg:col-span-2 space-y-6">
            {/* Preview Image */}
            {prompt.previewImage && (
              <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <Image
                  src={prompt.previewImage}
                  alt={prompt.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 66vw, 800px"
                  quality={85}
                />
              </div>
            )}

            {/* Title & Badges */}
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
                {prompt.title}
              </h1>

              <div className="flex flex-wrap gap-2">
                {/* Model Badge */}
                <span
                  className={`inline-block px-4 py-2 rounded-full text-white text-sm font-semibold ${modelColor}`}
                >
                  {prompt.model}
                </span>

                {/* Category Badge */}
                {prompt.category && (
                  <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100 text-sm font-semibold">
                    {prompt.category}
                  </span>
                )}

                {/* Aspect Ratio Badge */}
                {prompt.aspectRatio && (
                  <span className="inline-block px-4 py-2 rounded-full bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200 text-sm font-semibold">
                    {prompt.aspectRatio}
                  </span>
                )}
              </div>
            </div>

            {/* Tags */}
            {prompt.tags && prompt.tags.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {prompt.tags.map((tag) => (
                    <a
                      key={tag}
                      href={`/prompts?search=${encodeURIComponent(tag)}`}
                      className="inline-block px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    >
                      {tag}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Prompt Text */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                Prompt Text
              </h3>
              <div className="relative">
                <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
                  <p className="text-base leading-relaxed text-slate-900 dark:text-slate-50 whitespace-pre-wrap">
                    {promptText}
                  </p>
                </div>
                <PromptCopyButton
                  text={promptText}
                  label="Copy Prompt"
                  className="absolute top-4 right-4"
                />
              </div>
            </div>

            {/* Negative Prompt */}
            {negativePromptText && (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  Negative Prompt
                </h3>
                <div className="relative">
                  <div className="p-6 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
                    {negativeTags.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {negativeTags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-block px-3 py-1 bg-red-200 dark:bg-red-900 text-red-800 dark:text-red-100 rounded-lg text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-base text-red-900 dark:text-red-50 whitespace-pre-wrap">
                        {negativePromptText}
                      </p>
                    )}
                  </div>
                  <PromptCopyButton
                    text={negativePromptText}
                    label="Copy Negative"
                    className="absolute top-4 right-4"
                  />
                </div>
              </div>
            )}

            {/* Related Prompts */}
            {relatedPrompts.length > 0 && (
              <div className="space-y-4 pt-8 border-t border-slate-200 dark:border-slate-700">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Related Prompts
                </h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {relatedPrompts.map((relatedPrompt) => (
                    <div key={relatedPrompt.id} className="group">
                      <Link href={`/prompts/${relatedPrompt.id}`}>
                        <PromptCard
                          prompt={relatedPrompt}
                          isClickable={true}
                        />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Quick Actions */}
          <div className="space-y-6">
            <PromptActionsPanel 
              prompt={prompt}
              negativePromptText={negativePromptText}
            />
          </div>
        </div>
      </div>
    </>
  );
}
