import Link from "next/link";
import {
  getLatestPrompts,
  getPopularCategories,
  getTrendingPrompts,
} from "@/src/lib/content";
import { getPrompts } from "@/src/lib/data";
import DopamineHeroSection from "@/src/components/DopamineHeroSection";
import TrendingCarousel from "@/src/components/TrendingCarousel";
import DopaminePromptCard from "@/src/components/DopaminePromptCard";
import NewsletterCTA from "@/src/components/NewsletterCTA";

export const revalidate = 3600; // Revalidate every hour for dynamic stats

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

  // Calculate dynamic stats
  const totalPrompts = prompts.length;
  const uniqueModels = [...new Set(prompts.map((p) => p.model).filter(Boolean))];
  const totalAiTools = uniqueModels.length;

  const trendingPrompts = getTrendingPrompts(prompts, 6);
  const latestPrompts = getLatestPrompts(prompts)
    .filter((prompt) => !trendingPrompts.find((t) => t.id === prompt.id))
    .slice(0, 16);
  const popularCategories = getPopularCategories(prompts, 6);

  return (
    <div className="flex flex-col min-h-screen bg-slate-950">
      {/* HIGH-DOPAMINE HERO SECTION */}
      <DopamineHeroSection 
        totalPrompts={totalPrompts}
        totalAiTools={totalAiTools}
      />

      {/* Main Content */}
      <main className="flex-1 w-full py-12 sm:py-16 lg:py-20">
        
        {/* HIGH-DOPAMINE TRENDING CAROUSEL */}
        {trendingPrompts.length > 0 && (
          <TrendingCarousel prompts={trendingPrompts} />
        )}

        {/* Category Filter Pills */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20">
          <CategoryFilters popularCategories={popularCategories} />
        </div>

        {/* HIGH-DOPAMINE PROMPT GRID */}
        {latestPrompts.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-8">
              Explore Latest Prompts
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-max">
              {latestPrompts.map((prompt, index) => (
                <DopaminePromptCard 
                  key={prompt.id} 
                  prompt={prompt}
                  position={index}
                />
              ))}
            </div>
          </section>
        )}

        {/* Newsletter CTA */}
        <NewsletterCTA />
      </main>
    </div>
  );
}

// Category Filter Component
function CategoryFilters({ popularCategories }) {
  const aiModels = ["Midjourney", "DALL-E", "Stable Diffusion", "Flux", "Adobe Firefly"];
  const styles = ["Portrait", "Landscape", "Abstract", "Product", "3D Render", "Photography"];

  return (
    <section className="space-y-8">
      <div>
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">
          Filter by AI Platform
        </h3>
        <div className="flex flex-wrap gap-3">
          {aiModels.map((model) => (
            <Link
              key={model}
              href={`/prompts?model=${encodeURIComponent(model)}`}
              className="px-4 py-2 rounded-full border-2 border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-blue-600 hover:text-white hover:border-blue-600 dark:hover:border-blue-500 transition-all duration-300"
            >
              {model}
            </Link>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">
          Filter by Style
        </h3>
        <div className="flex flex-wrap gap-3">
          {styles.map((style) => (
            <Link
              key={style}
              href={`/prompts?style=${encodeURIComponent(style)}`}
              className="px-4 py-2 rounded-full border-2 border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-purple-600 hover:text-white hover:border-purple-600 dark:hover:border-purple-500 transition-all duration-300"
            >
              {style}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
