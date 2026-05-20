import { getPrompts } from '@/src/lib/data';
import { sortPrompts, getPromptStats } from '@/src/utils/prompts';
import type { Prompt } from '@/src/types';
import HomeHeroClient from '@/src/components/HomeHeroClient';
import TrendingCarousel from '@/src/components/TrendingCarousel';
import PromptGrid from '@/src/components/PromptGrid';
import CategoryShowcase from '@/src/components/CategoryShowcase';
import NewsletterCTA from '@/src/components/NewsletterCTA';
import { Metadata } from 'next';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'PhotoPromptsHub - AI Image Prompts for Midjourney, DALL·E, Flux & Stable Diffusion',
  description:
    'Discover thousands of curated AI image prompts for Midjourney, DALL·E, Flux, and Stable Diffusion. Get premium prompts optimized for cinematic results.',
  keywords: [
    'AI prompts',
    'Midjourney prompts',
    'DALL-E prompts',
    'Flux prompts',
    'Stable Diffusion prompts',
    'image generation',
    'prompt engineering',
    'AI art',
  ],
};

export default async function HomePage() {
  const prompts: Prompt[] = await getPrompts();

  // Calculate stats
  const stats = getPromptStats(prompts);

  // Get trending and latest
  const trendingPrompts = sortPrompts(
    prompts.filter((p) => p.isTrending),
    'trending',
  ).slice(0, 6);

  const latestPrompts = sortPrompts(prompts, 'newest').slice(0, 16);

  // Group by category
  const categories = [...new Set(prompts.map((p) => p.category))];
  const categoryData = categories.map((cat) => ({
    category: cat,
    prompts: prompts.filter((p) => p.category === cat).slice(0, 4),
    total: prompts.filter((p) => p.category === cat).length,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
      {/* ===== HERO SECTION ===== */}
      <HomeHeroClient totalPrompts={stats.total} totalModels={stats.models} />

      {/* ===== TRENDING CAROUSEL ===== */}
      {trendingPrompts.length > 0 && <TrendingCarousel prompts={trendingPrompts} />}

      {/* ===== LATEST PROMPTS SECTION ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">Latest Prompts</h2>
          <p className="text-lg text-slate-400">
            Explore {stats.total} premium AI prompts, {stats.tags} tags, {stats.categories} categories
          </p>
        </div>

        <PromptGrid prompts={latestPrompts} variant="grid" />

        {/* View All Button */}
        <div className="text-center mt-12">
          <a
            href="/prompts"
            className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all hover:scale-105"
          >
            Browse All Prompts →
          </a>
        </div>
      </section>

      {/* ===== CATEGORY SHOWCASE ===== */}
      {categoryData.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-8">
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">Browse by Category</h2>
            <p className="text-lg text-slate-400">Find the perfect prompts for your creative vision</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryData.slice(0, 8).map((cat) => (
              <CategoryShowcase key={cat.category} category={cat.category} count={cat.total} />
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="/categories"
              className="inline-block px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-all hover:scale-105"
            >
              View All Categories →
            </a>
          </div>
        </section>
      )}

      {/* ===== NEWSLETTER CTA ===== */}
      <NewsletterCTA />

      {/* ===== FEATURES SECTION ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-3 gap-8">
          <FeatureCard
            icon="⚡"
            title="Optimized Prompts"
            description="Each prompt is tested and optimized for maximum quality and consistency across all AI models."
          />
          <FeatureCard
            icon="🎨"
            title="Creative Styles"
            description="Explore thousands of unique styles, from cinematic to illustration, product to portrait photography."
          />
          <FeatureCard
            icon="🚀"
            title="Easy to Use"
            description="Copy prompts with one click and get started immediately in your favorite AI image generation tool."
          />
        </div>
      </section>
    </div>
  );
}

// ===== FEATURE CARD =====
function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-slate-600 transition text-center">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-slate-400">{description}</p>
    </div>
  );
}
