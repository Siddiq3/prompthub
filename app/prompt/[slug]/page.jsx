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

const cleanTextArray = (items = []) =>
  Array.isArray(items)
    ? items.map((item) => String(item || "").trim()).filter(Boolean)
    : [];

const cleanFaqItems = (items = []) =>
  Array.isArray(items)
    ? items
        .filter((item) => item && (item.question || item.answer))
        .map((item) => ({
          question: String(item.question || "").trim(),
          answer: String(item.answer || "").trim(),
        }))
        .filter((item) => item.question || item.answer)
    : [];

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
  const aboutParagraphs = cleanTextArray(prompt.about_paragraphs);
  const promptTips = cleanTextArray(prompt.prompt_tips);
  const legacyTips = cleanTextArray(prompt.tips);
  const tips = promptTips.length
    ? promptTips
    : legacyTips.length
      ? legacyTips
    : [
        `Run the prompt multiple times and pick the best result.`,
        `Add “ultra HD, 8K resolution” for sharper output when your tool supports it.`,
        `Try different aspect ratios to discover the most compelling composition.`,
      ];
  const faqItems = cleanFaqItems(prompt.faq).length
    ? cleanFaqItems(prompt.faq)
    : cleanFaqItems(prompt.faqItems).length
      ? cleanFaqItems(prompt.faqItems)
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
  const introText = prompt.intro || `This prompt is crafted to help you generate polished, high-quality AI imagery with a modern, visually striking look. It works especially well for ${prompt.category?.toLowerCase() || 'photo'} compositions and is tuned for use with ${prompt.modelLabel || prompt.model || 'top AI image models'}. Use it when you want reliable, creative results without manual prompt experimentation.`;
  const whatIsParagraph = prompt.what_is_paragraph || seoIntro;
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
                {introText}
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
              <h2 className="text-2xl font-semibold text-slate-900">About This Prompt</h2>
              {aboutParagraphs.length ? (
                aboutParagraphs.map((paragraph, index) => (
                  <p key={`about-${index}`} className="leading-8">
                    {paragraph}
                  </p>
                ))
              ) : (
                <>
                  <p>
                    This prompt has been shaped to deliver crisp, high-impact visuals with clear subject focus and strong atmosphere. It works best when you want a refined creative output that retains consistent styling across multiple generations. The structure balances descriptive detail with flexible composition guidance, so you can adapt the prompt quickly for portraits, product shots, landscapes, or editorial scenes.
                  </p>
                  <p>
                    When you use this prompt, start with the recommended model and adjust the color emphasis or lighting keywords to match your desired mood. The prompt is ideal for {prompt.modelLabel || prompt.model || 'modern AI visual engines'}, since it gives you a strong base while leaving enough room for the model to interpret artistic flourishes and realistic textures.
                  </p>
                  <p>
                    The primary goal is to get a clean first pass that needs minimal revision. Use the prompt for concept art, stylized photo-realistic scenes, social media imagery, or marketing visuals. The prompt is especially useful when you need consistent results across multiple designs, because it prioritizes a reliable structure over random output.
                  </p>
                </>
              )}
            </section>

            {prompt.how_it_works ? (
              <section className="max-w-2xl space-y-4 text-slate-700">
                <h2 className="text-2xl font-semibold text-slate-900">How This Prompt Works</h2>
                <p className="leading-8">{prompt.how_it_works}</p>
              </section>
            ) : null}

            {prompt.who_is_it_for ? (
              <section className="max-w-2xl space-y-4 text-slate-700">
                <h2 className="text-2xl font-semibold text-slate-900">Who This Prompt Is For</h2>
                <p className="leading-8">{prompt.who_is_it_for}</p>
              </section>
            ) : null}

            <article className="max-w-4xl mx-auto px-4 mt-12 space-y-12">
              <section className="space-y-6 text-slate-700">
                <h2 className="text-2xl font-semibold text-slate-900">Prompt Tips</h2>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {tips.map((tip, index) => (
                    <li
                      key={index}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-700"
                    >
                      {tip}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="space-y-6 text-slate-700">
                <h2 className="text-2xl font-semibold text-slate-900">What Are {categoryLabel} Prompts?</h2>
                <p>{whatIsParagraph}</p>
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

            <section className="max-w-2xl space-y-4 text-slate-700 mb-8">
              <h2 className="text-2xl font-semibold text-slate-900">Join & Follow</h2>
              <p className="text-sm text-slate-600">Stay connected with PhotoPromptsHub across Instagram, WhatsApp and Telegram.</p>
              <div className="space-y-3">
                <a
                  href="https://www.instagram.com/photosprompthub?igsh=MTNoNzJvYmxraG1meQ=="
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group flex items-center gap-4 w-full rounded-3xl bg-gradient-to-r from-fuchsia-500 via-pink-500 to-orange-400 px-5 py-4 text-white shadow-sm transition hover:from-fuchsia-600 hover:via-pink-600 hover:to-orange-500"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-fuchsia-600 transition group-hover:bg-fuchsia-100">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.056 1.977.24 2.436.403a4.92 4.92 0 011.675.98 4.918 4.918 0 01.981 1.674c.163.459.347 1.266.403 2.436.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.056 1.17-.24 1.977-.403 2.436a4.906 4.906 0 01-.98 1.675 4.906 4.906 0 01-1.675.981c-.459.163-1.266.347-2.436.403-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.056-1.977-.24-2.436-.403a4.92 4.92 0 01-1.675-.98 4.92 4.92 0 01-.981-1.675c-.163-.459-.347-1.266-.403-2.436C2.175 15.747 2.163 15.367 2.163 12s.012-3.584.07-4.85c.056-1.17.24-1.977.403-2.436a4.918 4.918 0 01.98-1.674 4.918 4.918 0 011.675-.981c.459-.163 1.266-.347 2.436-.403C8.416 2.175 8.796 2.163 12 2.163zm0 1.838c-3.17 0-3.553.012-4.805.069-1.038.048-1.599.217-1.972.363a3.14 3.14 0 00-1.147.748 3.14 3.14 0 00-.749 1.147c-.146.373-.315.934-.363 1.972-.057 1.252-.069 1.635-.069 4.805s.012 3.553.069 4.805c.048 1.038.217 1.599.363 1.972.175.446.405.828.749 1.147.318.317.7.548 1.147.749.373.146.934.315 1.972.363 1.252.057 1.635.069 4.805.069s3.553-.012 4.805-.069c1.038-.048 1.599-.217 1.972-.363a3.132 3.132 0 001.147-.749 3.132 3.132 0 00.749-1.147c.146-.373.315-.934.363-1.972.057-1.252.069-1.635.069-4.805s-.012-3.553-.069-4.805c-.048-1.038-.217-1.599-.363-1.972a3.14 3.14 0 00-.748-1.147 3.14 3.14 0 00-1.147-.749c-.373-.146-.934-.315-1.972-.363-1.252-.057-1.635-.069-4.805-.069z" />
                      <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998z" />
                      <circle cx="18.406" cy="5.594" r="1.44" />
                    </svg>
                  </span>
                  <span>Follow on Instagram</span>
                </a>
                <a
                  href="https://whatsapp.com/channel/0029VbCfYa9002TAlsIdh71m"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group flex items-center gap-4 w-full rounded-3xl bg-[#25D366] px-5 py-4 text-white shadow-sm transition hover:bg-[#1EB954]"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-[#25D366] transition group-hover:bg-green-100">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                      <path d="M20.52 3.48C18.4 1.36 15.6 0 12.48 0 5.73 0 .4 5.33.4 11.98c0 2.1.62 4.16 1.79 5.96L0 24l6.38-1.68A11.93 11.93 0 0012 24c6.75 0 12.08-5.32 12.08-11.98 0-3.12-1.36-5.92-3.74-8.45zm-2.74 13.3c-.2.56-1.22 1.1-1.68 1.17-.42.07-1.02.1-1.58-.12-.6-.22-1.57-.65-2.73-1.84-1.16-1.19-1.9-2.37-2.12-2.93-.23-.56-.02-.87.16-1.12.17-.23.39-.6.53-.77.14-.17.18-.27.26-.44.08-.16.04-.31-.02-.43-.06-.12-.64-1.46-.88-2.01-.23-.56-.47-.49-.64-.5-.16-.01-.35-.01-.54-.01-.18 0-.45.03-.68.31-.23.27-.88.99-.88 2.42 0 1.43.73 2.79.83 2.99.1.19 1.48 2.89 3.9 4.98 1.06.92 1.96 1.25 2.4 1.38.62.18 1.2.15 1.65.09.5-.07 1.22-.5 1.56-1.09.34-.58.38-1.04.27-1.14-.11-.1-.4-.16-.82-.28z"/>
                    </svg>
                  </span>
                  <span>Join on WhatsApp</span>
                </a>
                <a
                  href="https://t.me/photopromptshub"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group flex items-center gap-4 w-full rounded-3xl bg-[#2AABEE] px-5 py-4 text-white shadow-sm transition hover:bg-[#22A0E8]"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-[#2AABEE] transition group-hover:bg-sky-100">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                      <path d="M21 3L3 10l5.14 1.9L8 19l4.56-2.86L20 21 21 3z" />
                    </svg>
                  </span>
                  <span>Join on Telegram</span>
                </a>
              </div>
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
