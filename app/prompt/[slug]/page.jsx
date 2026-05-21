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

  return (
    <div className="min-h-screen bg-[#0B0E1A]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0">
        {/* Left: Full-height Image */}
        <div className="relative lg:sticky lg:top-16 lg:h-[calc(100vh-64px)] bg-[#131729] flex items-center justify-center overflow-hidden">
          <img
            src={prompt.previewImage}
            alt={prompt.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right: Action Panel */}
        <div className="flex flex-col lg:overflow-y-auto lg:h-[calc(100vh-64px)]">
          {/* Header Section */}
          <div className="border-b border-[rgba(255,255,255,0.08)] px-6 lg:px-8 py-8">
            <div className="max-w-2xl">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 mb-4 text-sm text-[#9CA3B8]">
                <Link href="/categories" className="hover:text-[#F0EBE3] transition">
                  Categories
                </Link>
                <span>/</span>
                <Link
                  href={`/category/${prompt.category?.toLowerCase()}`}
                  className="hover:text-[#F0EBE3] transition"
                >
                  {prompt.category}
                </Link>
              </div>

              <h1 className="text-4xl font-clash font-bold text-[#F0EBE3] mb-4">
                {prompt.title}
              </h1>

              {/* Model Badge */}
              <div className="inline-block px-3 py-1 rounded-full bg-[#1C2240] text-xs font-medium text-[#7C3AED] mb-6">
                {prompt.modelLabel || prompt.platform}
              </div>
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

            {/* Tags */}
            {(prompt.displayTags || []).length > 0 && (
              <div className="max-w-2xl">
                <h2 className="text-sm font-medium text-[#5B6380] mb-3 uppercase tracking-wide">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {prompt.displayTags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/prompts?tag=${encodeURIComponent(tag)}`}
                      className="px-3 py-1.5 rounded-full bg-[#1C2240] text-sm text-[#9CA3B8] hover:text-[#7C3AED] hover:bg-[#7C3AED]/20 transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Related Prompts */}
          <div className="border-t border-[rgba(255,255,255,0.08)] px-6 lg:px-8 py-8">
            <div className="max-w-full">
              <h2 className="text-xl font-clash font-bold text-[#F0EBE3] mb-6">
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

  const description =
    prompt.seoIntro ||
    `${prompt.title} is a ${prompt.category?.toLowerCase() || "photo"} prompt for ${prompt.modelLabel || prompt.model || "AI model"}.`;

  return {
    title: `${prompt.title} | PhotoPromptsHub`,
    description,
    openGraph: {
      title: prompt.title,
      description,
      url: `${SITE_URL}/prompt/${prompt.slug}`,
      images: prompt.previewImage ? [{ url: prompt.previewImage, width: 1200, height: 630 }] : [],
    },
  };
}
