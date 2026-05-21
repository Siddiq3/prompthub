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
        <div className="mb-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-[40px] font-black text-white">Latest prompts</h2>
              <p className="mt-2 text-lg text-slate-400 max-w-2xl">
                Discover the freshest prompt ideas for AI art, photography compositions, cinematic scenes, and product visuals.
              </p>
            </div>
            <a href="/prompts" className="inline-flex h-12 items-center justify-center rounded-full border border-white/[0.08] bg-white/5 px-6 text-sm font-semibold text-white transition hover:border-[#7c3aed] hover:bg-white/10">
              View all prompts →
            </a>
          </div>
        </div>

        <PromptGrid prompts={latestPrompts.slice(0, 9)} variant="grid" />

        <div className="mt-10 flex justify-center">
          <a href="/prompts" className="inline-flex h-14 items-center justify-center rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899] px-8 text-base font-semibold text-white shadow-lg shadow-[#7C3AED]/20 transition hover:opacity-95">
            Browse more prompts
          </a>
        </div>
      </section>

      {/* ===== CATEGORY SHOWCASE ===== */}
      {categoryData.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-[40px] font-black text-white mb-2">Browse by category</h2>
                <p className="text-lg text-slate-400 max-w-2xl">
                  Jump into categories tailored for portraits, landscapes, product shots, sci-fi art, and more.
                </p>
              </div>
              <a href="/categories" className="inline-flex h-12 items-center justify-center rounded-full border border-white/[0.08] bg-white/5 px-6 text-sm font-semibold text-white transition hover:border-[#7c3aed] hover:bg-white/10">
                Explore categories →
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categoryData.slice(0, 8).map((cat) => (
              <CategoryShowcase
                key={cat.category}
                category={cat.category}
                count={cat.total}
                image={cat.prompts && cat.prompts[0] ? cat.prompts[0].previewImage : ''}
              />
            ))}
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
