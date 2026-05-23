import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPromptBySlug, getPrompts } from "@/src/lib/data";
import { getRelatedPrompts } from "@/src/lib/content";
import PromptCard from "@/src/components/PromptCard";
import PromptDetailsPanel from "@/src/components/PromptDetailsPanel";
import { SITE_URL } from "@/src/config";

export default async function PromptDetailsPage({ params }) {
  const { slug } = params;
  const prompt = await getPromptBySlug(slug);
  
  if (!prompt) notFound();

  const allPrompts = await getPrompts();
  const relatedPrompts = getRelatedPrompts(allPrompts, prompt, 6);
  const trimmedPrompt = prompt.prompt || prompt.text || "";
  const pageUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "https://photopromptshub.in"}/prompt/${slug}`;

  // JSON-LD Schema Markup
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": pageUrl,
        "headline": prompt.title,
        "description": prompt.seo?.metaDescription || prompt.title,
        "image": {
          "@type": "ImageObject",
          "url": prompt.previewImage,
        },
        "datePublished": prompt.createdAt,
        "author": {
          "@type": "Organization",
          "name": "PhotoPromptsHub",
          "logo": {
            "@type": "ImageObject",
            "url": `${process.env.NEXT_PUBLIC_SITE_URL || "https://photopromptshub.in"}/logo.png`,
          },
        },
        "publisher": {
          "@type": "Organization",
          "name": "PhotoPromptsHub",
          "logo": {
            "@type": "ImageObject",
            "url": `${process.env.NEXT_PUBLIC_SITE_URL || "https://photopromptshub.in"}/logo.png`,
          },
        },
        "keywords": (prompt.seo?.keywords || prompt.tags || []).join(", "),
      },
      {
        "@type": "CreativeWork",
        "name": prompt.title,
        "description": prompt.prompt,
        "category": [prompt.category, prompt.model, ...((prompt.tags || []).slice(0, 5))],
        "about": {
          "@type": "Thing",
          "name": prompt.model,
          "description": `AI image generation for ${prompt.category}`,
        },
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": `${process.env.NEXT_PUBLIC_SITE_URL || "https://photopromptshub.in"}`,
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Prompts",
            "item": `${process.env.NEXT_PUBLIC_SITE_URL || "https://photopromptshub.in"}/prompts`,
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": prompt.category,
            "item": `${process.env.NEXT_PUBLIC_SITE_URL || "https://photopromptshub.in"}/category/${(prompt.category || "").toLowerCase().replace(/\s+/g, "-")}`,
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": prompt.title,
            "item": pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
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

            {/* Tags */}
            {(prompt.displayTags || []).length > 0 && (
              <div className="max-w-2xl">
                <h2 className="text-sm font-medium text-slate-500 mb-3 uppercase tracking-wide">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {prompt.displayTags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/prompts?tag=${encodeURIComponent(tag)}`}
                      className="px-3 py-1.5 rounded-full bg-slate-100 text-sm text-slate-700 hover:text-slate-900 hover:bg-slate-200 transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Related Prompts */}
          <div className="border-t border-slate-200 px-6 lg:px-8 py-8">
            <div className="max-w-full">
              <h2 className="text-xl font-clash font-bold text-slate-900 mb-6">
                Similar Prompts
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
    </>
  );
}

export async function generateStaticParams() {
  const prompts = await getPrompts();
  return prompts.map((prompt) => ({
    slug: prompt.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = params;
  const prompt = await getPromptBySlug(slug);
  
  if (!prompt) notFound();

  const keywords = prompt.seo?.keywords || prompt.tags || [];
  const description = prompt.seo?.metaDescription || prompt.seoIntro ||
    `${prompt.title} - ${prompt.category} AI prompt for ${prompt.model}. Create stunning ${prompt.category?.toLowerCase()} images with this detailed ${prompt.model} prompt. ${prompt.tags?.slice(0, 3).join(', ')}.`;

  const title = prompt.seo?.metaTitle || `${prompt.title} | AI Prompt for ${prompt.model}`;
  const pageUrl = `${SITE_URL}/prompt/${prompt.slug}`;

  return {
    title,
    description,
    keywords: keywords.join(', '),
    openGraph: {
      title,
      description,
      url: pageUrl,
      type: 'article',
      images: prompt.previewImage ? [{ url: prompt.previewImage, width: 1200, height: 630, alt: prompt.title }] : [],
      authors: ['PhotoPromptsHub'],
      publishedTime: prompt.createdAt,
      tags: keywords.slice(0, 5),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: prompt.previewImage ? [prompt.previewImage] : [],
    },
    alternates: {
      canonical: pageUrl,
    },
    authors: [{ name: 'PhotoPromptsHub' }],
    creator: 'PhotoPromptsHub',
  };
}
