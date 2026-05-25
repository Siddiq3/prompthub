import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { PRIMARY_CATEGORY_ORDER } from "@/src/lib/taxonomy";
import { getCategories } from "@/src/lib/content";
import { getPrompts } from "@/src/lib/data";
import { getVideoWorkflows } from "@/src/lib/videoWorkflows";
import { SkeletonHeader, SkeletonCategoryGrid } from "@/src/components/SkeletonLoaders";

const CATEGORY_EMOJI = {
  Portrait: "📸",
  Kids: "🧒",
  Fashion: "👗",
  "Ramadan & Eid": "🌙",
  Wedding: "💍",
  Sports: "🏅",
  Cinematic: "🎬",
  Beauty: "💄",
  Street: "🚶",
};

const EMAIL_ADDRESS = "photopromptshub@gmail.com";

export function generateMetadata() {
  return {
    title: "Photography Prompt Categories - ChatGPT & Gemini | Browse by Type",
    description: "Browse photography prompt categories including portraits, fashion, cinematic, lifestyle, and more. Organized for ChatGPT and Gemini AI image generation.",
    keywords: "photography prompts, portrait prompts, fashion prompts, cinematic prompts, lifestyle prompts, ChatGPT prompts, Gemini prompts, prompt categories",
    robots: "index, follow",
    openGraph: {
      title: "Photography Prompt Categories - ChatGPT & Gemini",
      description: "Browse thousands of AI prompts organized by category and style.",
      type: "website",
    },
  };
}

const getPreviewImages = (category) => {
  return category.prompts.slice(0, 4).map((prompt) => prompt.previewImage);
};

async function CategoriesContent() {
  const [prompts, videoWorkflows] = await Promise.all([getPrompts(), getVideoWorkflows()]);
  const categories = getCategories([...prompts, ...videoWorkflows]);
  const primaryCategorySet = new Set(PRIMARY_CATEGORY_ORDER);
  const featuredCategories = categories.filter((category) => primaryCategorySet.has(category.name));
  const otherCategories = categories.filter((category) => !primaryCategorySet.has(category.name));

  return (
    <div className="space-y-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12">
      {categories.length > 0 ? (
        <div className="space-y-10">

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-400">
              Featured categories
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredCategories.map((category) => {
            const images = getPreviewImages(category);
            const emoji = CATEGORY_EMOJI[category.name] || "✨";

            return (
              <Link
                key={category.name}
                href={category.href}
                className="group block overflow-hidden rounded-[28px] border border-white/10 bg-slate-950 shadow-[0_24px_80px_rgba(15,23,42,0.25)] transition-transform duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:border-violet-400/50"
              >
                <div className="relative h-[220px] w-full bg-slate-900">
                  <div className="grid h-full grid-cols-2 grid-rows-2 gap-0">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <div key={index} className="relative overflow-hidden">
                        {images[index] ? (
                          <Image
                            src={images[index]}
                            alt={`${category.name} preview ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="h-full w-full bg-slate-800" />
                        )}
                        <div className="absolute inset-0 bg-slate-950/20" />
                      </div>
                    ))}
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E1A]/95 via-[#0B0E1A]/70 to-[#0B0E1A]/30" />

                  <div className="absolute inset-0 flex flex-col justify-between p-4">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-2xl">
                        {emoji}
                      </span>
                    </div>
                    <div className="flex items-end justify-between gap-3">
                      <div>
                        <p className="text-base font-semibold text-white">{category.name}</p>
                      </div>
                      <span className="rounded-full bg-violet-500/95 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-lg shadow-violet-500/20">
                        {category.count.toLocaleString()} prompts
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {otherCategories.length > 0 ? (
          <div className="space-y-6 border-t border-white/10 pt-10">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
                More categories
              </p>
            </div>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {otherCategories.map((category) => {
                const images = getPreviewImages(category);
                const emoji = CATEGORY_EMOJI[category.name] || "✨";

                return (
                  <Link
                    key={category.name}
                    href={category.href}
                    className="group block overflow-hidden rounded-[28px] border border-white/10 bg-slate-950 shadow-[0_24px_80px_rgba(15,23,42,0.25)] transition-transform duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:border-violet-400/50"
                  >
                    <div className="relative h-[220px] w-full bg-slate-900">
                      <div className="grid h-full grid-cols-2 grid-rows-2 gap-0">
                        {Array.from({ length: 4 }).map((_, index) => (
                          <div key={index} className="relative overflow-hidden">
                            {images[index] ? (
                              <Image
                                src={images[index]}
                                alt={`${category.name} preview ${index + 1}`}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="h-full w-full bg-slate-800" />
                            )}
                            <div className="absolute inset-0 bg-slate-950/20" />
                          </div>
                        ))}
                      </div>

                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E1A]/95 via-[#0B0E1A]/70 to-[#0B0E1A]/30" />

                      <div className="absolute inset-0 flex flex-col justify-between p-4">
                        <div className="flex items-center justify-between">
                          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-2xl">
                            {emoji}
                          </span>
                        </div>
                        <div className="flex items-end justify-between gap-3">
                          <div>
                            <p className="text-base font-semibold text-white">{category.name}</p>
                          </div>
                          <span className="rounded-full bg-violet-500/95 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-lg shadow-violet-500/20">
                            {category.count.toLocaleString()} prompts
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
      ) : (
        <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-12 text-center text-slate-400">
          No categories available at the moment.
        </div>
      )}

      <section className="rounded-[28px] border border-white/10 bg-slate-950/80 px-6 py-8 text-center shadow-[0_24px_80px_rgba(15,23,42,0.25)]">
        <p className="text-lg font-semibold text-white">Can&apos;t find what you need?</p>
        <p className="mt-2 text-slate-400 max-w-2xl mx-auto">
          Suggest a new category and help us grow the PhotoPromptsHub library.
        </p>
        <a
          href={`mailto:${EMAIL_ADDRESS}?subject=New category suggestion`}
          className="mt-6 inline-flex items-center justify-center rounded-full bg-violet-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-400"
        >
          Suggest a category
        </a>
      </section>
      </div>
    );
}

export default function CategoriesPage() {
  return (
    <>
      <div className="bg-white text-black py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-clash font-bold mb-4 text-black">All categories</h1>
          <p className="text-slate-700 text-lg leading-relaxed">Find the perfect prompts for your creative vision</p>
        </div>
      </div>

      <Suspense
        fallback={
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <SkeletonHeader />
            <SkeletonCategoryGrid count={8} />
          </section>
        }
      >
        <CategoriesContent />
      </Suspense>
    </>
  );
}
