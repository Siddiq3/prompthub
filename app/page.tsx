import { Suspense } from 'react';
import { getPrompts } from '@/src/lib/data';
import { getVideoWorkflows } from '@/src/lib/videoWorkflows';
import { sortPrompts } from '@/src/utils/prompts';
import type { HomepageContentItem } from '@/src/types';
import TrendingCarousel from '@/src/components/TrendingCarousel';
import PromptGrid from '@/src/components/PromptGrid';
import CategoryShowcase from '@/src/components/CategoryShowcase';
import NewsletterCTA from '@/src/components/NewsletterCTA';
import {
  SkeletonTrendingCarousel,
  SkeletonHeader,
  SkeletonGrid,
  SkeletonCategoryGrid,
} from '@/src/components/SkeletonLoaders';

export const revalidate = 3600;

export function generateMetadata() {
  return {
    title: 'PhotoPromptsHub - Trending AI Image Prompts for ChatGPT & Gemini',

    description:
      'Discover trending AI image prompts for ChatGPT and Gemini, including cinematic portraits, Indian festival edits, fashion photography, viral social media styles, realistic AI portraits, couple poses, traditional looks, and creative photo ideas for Instagram, reels, and digital creators.',

    keywords: [
      'AI image prompts',
      'ChatGPT prompts',
      'Gemini AI prompts',
      'Indian AI prompts',
      'trending AI prompts',
      'viral photo prompts',
      'AI photography prompts',
      'Instagram AI prompts',
      'traditional Indian AI prompts',
      'fashion photography prompts',
      'realistic AI portraits',
      'couple photo prompts',
      'festival AI prompts',
      'creative AI image ideas',
    ],

  };
}

async function HeroSection() {
  const prompts = await getPrompts();
  const trendingPrompts = sortPrompts(
    prompts.filter((p) => p.isTrending),
    'trending',
  ).slice(0, 6);

  if (trendingPrompts.length === 0) return null;
  return <TrendingCarousel prompts={trendingPrompts} />;
}

async function LatestSection() {
  const [prompts, videoWorkflows] = await Promise.all([getPrompts(), getVideoWorkflows()]);
  const imageItems: HomepageContentItem[] = prompts.map((prompt) => ({
    ...prompt,
    type: 'image',
  }));
  const latestItems = [...imageItems, ...videoWorkflows].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-[40px] font-black text-slate-900">Latest prompts & workflows</h2>
            {/* <p className="mt-2 text-lg text-slate-600 max-w-2xl">
              Discover the freshest prompt ideas for AI art, photography compositions, cinematic scenes, and product visuals.
            </p> */}
          </div>
          <a href="/prompts" className="inline-flex h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-900 transition hover:border-[#7c3aed] hover:bg-slate-100">
            View all prompts →
          </a>
        </div>
      </div>

      <PromptGrid prompts={latestItems} variant="grid" />

      <div className="mt-10 flex justify-center">
        <a href="/prompts" className="inline-flex h-14 items-center justify-center rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899] px-8 text-base font-semibold text-white shadow-lg shadow-[#7C3AED]/20 transition hover:opacity-95">
          Browse more prompts
        </a>
      </div>
    </section>
  );
}

async function CategorySection() {
  const prompts = await getPrompts();
  const categories = [...new Set(prompts.map((p) => p.category))];
  const categoryData = categories.map((cat) => ({
    category: cat,
    prompts: prompts.filter((p) => p.category === cat).slice(0, 4),
    total: prompts.filter((p) => p.category === cat).length,
  }));

  if (categoryData.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-[40px] font-black text-slate-900 mb-2">Browse by category</h2>
            <p className="text-lg text-slate-600 max-w-2xl">
              Jump into categories tailored for portraits, landscapes, product shots, sci-fi art, and more.
            </p>
          </div>
          <a href="/categories" className="inline-flex h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-900 transition hover:border-[#7c3aed] hover:bg-slate-100">
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
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* HERO CAROUSEL */}
      {/* <Suspense fallback={<SkeletonTrendingCarousel />}>
        <HeroSection />
      </Suspense> */}

      {/* LATEST PROMPTS SECTION */}
      <Suspense
        fallback={
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <SkeletonHeader />
            <SkeletonGrid count={9} />
          </section>
        }
      >
        <LatestSection />
      </Suspense>

      {/* CATEGORY SHOWCASE */}
      <Suspense
        fallback={
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <SkeletonHeader />
            <SkeletonCategoryGrid count={8} />
          </section>
        }
      >
        <CategorySection />
      </Suspense>

      {/* NEWSLETTER CTA */}
      <NewsletterCTA />

      {/* FEATURES SECTION */}
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
    <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm transition text-center">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </div>
  );
}
