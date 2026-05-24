import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPromptBySlug, getPrompts } from "@/src/lib/data";
import { getRelatedPrompts } from "@/src/lib/content";
import PromptCard from "@/src/components/PromptCard";
import PromptDetailsPanel from "@/src/components/PromptDetailsPanel";
import FaqAccordion from "@/src/components/FaqAccordion";
import { SITE_URL } from "@/src/config";
import { formatDate } from "@/src/utils/prompts";

export const revalidate = 3600;

const TOOL_EMOJI = {
  ChatGPT: "🤖",
  Gemini: "🔮",
};

const getToolDescription = (tool) => {
  const normalized = String(tool || "").trim();

  if (normalized.includes("ChatGPT")) {
    return "ChatGPT's image generation excels with detailed photographic prompts, consistent character descriptions, and refined visual direction.";
  }

  if (normalized.includes("Gemini")) {
    return "Gemini AI image generation delivers photorealistic imagery and handles complex scene composition with excellent detail and creativity.";
  }

  return "A powerful AI image generation tool that works best with detailed descriptive prompts and clear visual direction.";
};

const formatList = (items = []) => {
  const trimmed = Array.isArray(items) ? items.filter(Boolean) : [];
  return trimmed.slice(0, 3).join(", ");
};

export default async function PromptDetailsPage({ params }) {
  const { slug } = params;
  const prompt = await getPromptBySlug(slug);
  
  if (!prompt) notFound();

  const allPrompts = await getPrompts();
  const relatedPrompts = getRelatedPrompts(allPrompts, prompt, 6);
  const trimmedPrompt = prompt.prompt || prompt.text || "";
  const pageUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "https://photopromptshub.in"}/prompt/${slug}`;
  const seoIntro = prompt.seoIntro || prompt.seo?.metaDescription || prompt.prompt || prompt.title;
  const categoryLabel = prompt.category || "AI";
  const compatibleModels = Array.isArray(prompt.compatibleModels) && prompt.compatibleModels.length > 0 ? prompt.compatibleModels : [prompt.modelLabel || prompt.model || "AI model"];
  const primaryModel = compatibleModels[0];
  const otherModels = compatibleModels.slice(1);
  const previewTags = formatList(prompt.tags || prompt.displayTags || []);
  const audienceSentence = prompt.occasion
    ? `This prompt is perfect for ${prompt.occasion} themed content and is designed for ${prompt.audience || "your audience"}.`
    : "";
  const authorName = prompt.author || 'SiddiqKolimi';
  const authorBio = `${authorName} is a software developer and AI content creator specializing in modern web applications, SEO-focused platforms, and AI-powered workflows. His platforms provide easy-to-use AI prompts for creating professional-quality photos, cinematic visuals, and creative digital content.`;
  const howToSteps = prompt.howToSteps?.length
    ? prompt.howToSteps
    : [
        `Copy the prompt above using the Copy button and open ${primaryModel}.`,
        `Paste the prompt into the image input field or chat box.`,
        `If your tool supports it, add a negative prompt for cleaner output.`,
        `Generate the image and review the first result.`,
        `Tweak the prompt or aspect ratio until the composition matches your vision.`,
      ];
  const tips = prompt.tips?.length
    ? prompt.tips
    : [
        `Run the prompt multiple times and pick the best result.`,
        `Add “ultra HD, 8K resolution” for sharper output when your tool supports it.`,
        `Try different aspect ratios to discover the most compelling composition.`,
      ];
  const faqItems = prompt.faqItems?.length
    ? prompt.faqItems
    : [
        {
          question: `What is the best way to use this ${categoryLabel} prompt?`,
          answer: `Use it with ${primaryModel} and tailor the scene details for your subject to get cleaner results.`,
        },
        {
          question: `Can I use this prompt with other AI tools?`,
          answer: `Yes, it works well with ${compatibleModels.join(", ")} and can be adjusted slightly for each platform.`,
        },
      ];
  const pageTags = prompt.tags?.length ? prompt.tags : prompt.displayTags || [];

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0">
        {/* Left: Full-height Image */}
        <div className="relative lg:sticky lg:top-16 h-80 sm:h-96 lg:h-[calc(100vh-64px)] bg-slate-100 flex items-center justify-center overflow-hidden">
          <div className="relative h-full w-full">
            {prompt.previewImage ? (
              <Image
                src={prompt.previewImage}
                alt={prompt.title}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-slate-100 text-slate-500">
                No preview available
              </div>
            )}
          </div>
        </div>

        {/* Right: Action Panel */}
        <div className="flex flex-col lg:overflow-y-auto lg:h-[calc(100vh-64px)]">
          {/* Header Section */}
          <div className="border-b border-slate-200 px-6 lg:px-8 py-8">
            <div className="max-w-2xl">
              {/* Breadcrumb */}
              <div className="flex flex-wrap items-center gap-2 mb-4 text-sm text-slate-500">
                <Link href="/" className="hover:text-slate-900 transition">
                  Home
                </Link>
                <span>/</span>
                <Link href="/prompts" className="hover:text-slate-900 transition">
                  Prompts
                </Link>
                <span>/</span>
                <Link
                  href={`/category/${prompt.category?.toLowerCase()}`}
                  className="hover:text-slate-900 transition"
                >
                  {prompt.category}
                </Link>
                <span>/</span>
                <span className="text-slate-500">{prompt.title}</span>
              </div>

              <h1 className="text-4xl font-clash font-bold text-slate-900 mb-4">
                {prompt.title}
              </h1>

              <div className="flex flex-wrap items-center gap-3 text-sm text-blue-600 mb-4">
                <span>By {authorName}</span>
                <span>/</span>
                <span>{prompt.createdAt ? formatDate(prompt.createdAt) : 'Unknown date'}</span>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 mb-6">
                {prompt.modelLabel || prompt.platform || prompt.model}
              </div>

              <p className="max-w-2xl text-base leading-8 text-slate-600">
                This prompt is crafted to help you generate polished, high-quality AI imagery with a modern, visually striking look. It works especially well for {prompt.category?.toLowerCase() || 'photo'} compositions and is tuned for use with {prompt.modelLabel || prompt.model || 'top AI image models'}. Use it when you want reliable, creative results without manual prompt experimentation.
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 px-6 lg:px-8 py-8 space-y-8">
            {/* Actions */}
            <div className="space-y-3 max-w-2xl">
              <PromptDetailsPanel
                prompt={prompt}
                promptText={trimmedPrompt}
                pageUrl={`${process.env.NEXT_PUBLIC_SITE_URL || "https://photopromptshub.in"}/prompt/${slug}`}
              />
            </div>

            <section className="max-w-2xl space-y-6 text-slate-700">
              <h2 className="text-2xl font-semibold text-slate-900">About this prompt</h2>
              <p>
                This prompt has been shaped to deliver crisp, high-impact visuals with clear subject focus and strong atmosphere. It works best when you want a refined creative output that retains consistent styling across multiple generations. The structure balances descriptive detail with flexible composition guidance, so you can adapt the prompt quickly for portraits, product shots, landscapes, or editorial scenes.
              </p>
              <p>
                When you use this prompt, start with the recommended model and adjust the color emphasis or lighting keywords to match your desired mood. The prompt is ideal for {prompt.modelLabel || prompt.model || 'modern AI visual engines'}, since it gives you a strong base while leaving enough room for the model to interpret artistic flourishes and realistic textures.
              </p>
              <p>
                The primary goal is to get a clean first pass that needs minimal revision. Use the prompt for concept art, stylized photo-realistic scenes, social media imagery, or marketing visuals. The prompt is especially useful when you need consistent results across multiple designs, because it prioritizes a reliable structure over random output.
              </p>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Tips for best results</h3>
                <ul className="list-inside list-disc space-y-3 text-slate-700">
                  <li>Use the prompt as a starting point and add one or two style modifiers like "cinematic lighting" or "soft film grain."</li>
                  <li>Keep your subject and mood consistent across variations to maintain visual coherence.</li>
                  <li>For more dramatic results, boost contrast with words like "moody shadows" or "high-end editorial."</li>
                  <li>Adjust the model seed or prompt strength if your tool supports it to fine-tune detail and texture.</li>
                </ul>
              </div>
            </section>

            <article className="max-w-4xl mx-auto px-4 mt-12 space-y-12">
              <section className="space-y-6 text-slate-700">
                <h2 className="text-2xl font-semibold text-slate-900">What is {categoryLabel} AI Prompt?</h2>
                <p>{seoIntro}</p>
                <p>
                  This {categoryLabel} prompt works best with {primaryModel}
                  {otherModels.length > 0 ? ` and is also compatible with ${otherModels.join(", ")}` : ""}.
                  {previewTags
                    ? ` It produces ${previewTags} style images optimized for Instagram, YouTube Shorts, and social media.`
                    : " It is optimized for social media-ready imagery."}
                </p>
                {audienceSentence ? <p>{audienceSentence}</p> : null}
              </section>

              <section className="space-y-6 text-slate-700">
                <h2 className="text-2xl font-semibold text-slate-900">How to Use This Prompt</h2>
                <ol className="space-y-4">
                  {howToSteps.map((step, index) => (
                    <li key={index} className="flex items-start gap-4">
                      <span className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-violet-600 text-sm font-semibold text-white">
                        {index + 1}
                      </span>
                      <span className="text-sm leading-7 text-slate-700">{step}</span>
                    </li>
                  ))}
                </ol>
              </section>

              <section className="space-y-6 text-slate-700">
                <h2 className="text-2xl font-semibold text-slate-900">Best AI Tools for This Prompt</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {compatibleModels.map((tool) => (
                    <div key={tool} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{TOOL_EMOJI[tool] || "✨"}</span>
                        <span className="font-semibold text-slate-900">{tool}</span>
                      </div>
                      <p className="mt-3 text-sm leading-7 text-slate-600">{getToolDescription(tool)}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="space-y-6 text-slate-700">
                <h2 className="text-2xl font-semibold text-slate-900">Tips to Get Better Results</h2>
                <ul className="space-y-3 text-slate-700">
                  {tips.map((tip, index) => (
                    <li key={index} className="flex gap-3 text-sm leading-7">
                      <span className="text-emerald-600">✅</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="space-y-6 text-slate-700">
                <h2 className="text-2xl font-semibold text-slate-900">Frequently Asked Questions</h2>
                <FaqAccordion faqItems={faqItems} />
              </section>

              {pageTags.length > 0 && (
                <section className="space-y-4">
                  <h2 className="text-xl font-semibold text-slate-900">🏷️ Related Tags</h2>
                  <div className="flex flex-wrap gap-2">
                    {pageTags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/prompts?tag=${encodeURIComponent(tag)}`}
                        className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700 transition hover:bg-slate-200"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              <section>
                <div className="w-full h-24 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center text-gray-400 text-sm">
                  Advertisement
                </div>
              </section>
            </article>

            <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6 lg:mx-6 lg:px-8 lg:py-8 mb-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-3">About the author</h2>
              <p className="text-sm leading-7 text-slate-700">
                {authorName} is a software developer and AI content creator specializing in modern web applications, SEO-focused platforms, and AI-powered workflows. His platforms provide easy-to-use AI prompts for creating professional-quality photos, cinematic visuals, and creative digital content.
              </p>
            </section>

            <div className="border-t border-slate-200 px-6 lg:px-8 py-8">
              <div className="max-w-full">
                <h2 className="text-xl font-clash font-bold text-slate-900 mb-6">
                  You Might Also Like
                </h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {relatedPrompts.slice(0, 3).map((p) => (
                    <PromptCard key={p.id} prompt={p} priority={false} />
                  ))}
                </div>
              </div>
            </div>

        </div>
      </div>
    </div>
  </div>
  );
}

export async function generateStaticParams() {
  const prompts = await getPrompts();
  return prompts.map((prompt) => ({
    slug: prompt.slug,
  }));
}
