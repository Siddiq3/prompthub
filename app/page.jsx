import Link from "next/link";
import {
  getLatestPrompts,
  getPopularCategories,
  getTrendingPrompts,
} from "@/src/lib/content";
import { getPrompts } from "@/src/lib/data";
import HomeHeroClient from "@/src/components/HomeHeroClient";
import TrendingGrid from "@/src/components/TrendingGrid";
import NewArrivalsCarousel from "@/src/components/NewArrivalsCarousel";
import AdSlot from "@/src/components/AdSlot";

export const metadata = {
  title: "PhotoPromptsHub - AI Image Prompts for Midjourney, DALL·E, Flux & Stable Diffusion",
  description: "Discover thousands of curated AI image prompts for Midjourney, DALL·E, Flux, and Stable Diffusion. Browse by category, style, and use case.",
  openGraph: {
    title: "PhotoPromptsHub - AI Image Prompts",
    description: "Discover thousands of curated AI image prompts for Midjourney, DALL·E, Flux, and Stable Diffusion.",
    url: "https://photopromptshub.in",
    type: "website",
  },
};

export default async function HomePage() {
  const prompts = await getPrompts();

  const trendingPrompts = getTrendingPrompts(prompts, 6);
  const latestPrompts = getLatestPrompts(prompts)
    .filter((prompt) => !trendingPrompts.find((t) => t.id === prompt.id))
    .slice(0, 12);
  const popularCategories = getPopularCategories(prompts, 6);

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950">
      {/* Hero Section */}
      <HomeHeroClient />

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Category Filter Pills */}
        <CategoryFilters popularCategories={popularCategories} />

        <AdSlot slot="home_top" />

        {/* Trending Prompts Grid */}
        {trendingPrompts.length > 0 && (
          <TrendingGrid
            title="Trending This Week"
            description="The most popular prompts right now"
            prompts={trendingPrompts}
          />
        )}

        <AdSlot slot="home_middle" />

        {/* New Arrivals Carousel */}
        {latestPrompts.length > 0 && (
          <NewArrivalsCarousel
            title="New Arrivals"
            description="Recently added prompts"
            prompts={latestPrompts}
          />
        )}
      </main>
    </div>
  );
}

// Category Filter Component
function CategoryFilters({ popularCategories }) {
  const aiModels = ["Midjourney", "DALL-E", "Stable Diffusion", "Flux", "Adobe Firefly"];
  const styles = ["Portrait", "Landscape", "Abstract", "Product", "3D Render", "Photography"];

  return (
    <section className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">
          Filter by AI Platform
        </h3>
        <div className="flex flex-wrap gap-2">
          {aiModels.map((model) => (
            <Link
              key={model}
              href={`/prompts?model=${encodeURIComponent(model)}`}
              className="px-4 py-2 rounded-full border border-slate-300 dark:border-slate-600 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all"
            >
              {model}
            </Link>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">
          Filter by Style
        </h3>
        <div className="flex flex-wrap gap-2">
          {styles.map((style) => (
            <Link
              key={style}
              href={`/prompts?style=${encodeURIComponent(style)}`}
              className="px-4 py-2 rounded-full border border-slate-300 dark:border-slate-600 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all"
            >
              {style}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
