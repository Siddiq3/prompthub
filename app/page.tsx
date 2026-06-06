import { Suspense } from 'react';
import { getPrompts } from '@/src/lib/data';
import { getVideoWorkflows } from '@/src/lib/videoWorkflows';
import { sortPrompts } from '@/src/utils/prompts';
import type { HomepageContentItem } from '@/src/types';
import TrendingCarousel from '@/src/components/TrendingCarousel';
import PromptGrid from '@/src/components/PromptGrid';
import Pagination from '@/src/components/Pagination';
import CategoryShowcase from '@/src/components/CategoryShowcase';
import NewsletterCTA from '@/src/components/NewsletterCTA';
import {
  SkeletonTrendingCarousel,
  SkeletonHeader,
  SkeletonGrid,
  SkeletonCategoryGrid,
} from '@/src/components/SkeletonLoaders';

export const revalidate = 3600;

const HOME_ITEMS_PER_PAGE = 12;

const parsePageParam = (value: string | string[] | undefined) => {
  const rawValue = Array.isArray(value) ? value[0] : value;
  const page = Number.parseInt(rawValue || '1', 10);

  return Number.isFinite(page) && page > 0 ? page : 1;
};

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

async function LatestSection({ currentPage }: { currentPage: number }) {
  const [prompts, videoWorkflows] = await Promise.all([getPrompts(), getVideoWorkflows()]);
  const imageItems: HomepageContentItem[] = prompts.map((prompt) => ({
    ...prompt,
    type: 'image',
  }));
  const latestItems = [...imageItems, ...videoWorkflows].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
  const totalPages = Math.max(1, Math.ceil(latestItems.length / HOME_ITEMS_PER_PAGE));
  const validPage = Math.min(currentPage, totalPages);
  const paginatedItems = latestItems.slice(
    (validPage - 1) * HOME_ITEMS_PER_PAGE,
    validPage * HOME_ITEMS_PER_PAGE,
  );

  return (
    <section className="py-10">
      <div className="mb-8 border-b border-slate-200 pb-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#2271b1]">Prompt Journal</p>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight text-slate-950 sm:text-5xl">
              AI image prompts, tutorials, and creative ideas
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              Browse fresh prompt articles for portraits, fashion edits, cinematic scenes, and creator-ready AI photography ideas.
            </p>
          </div>
          <a href="/prompts" className="inline-flex h-11 items-center justify-center rounded-md border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-800 transition hover:border-[#2271b1] hover:text-[#2271b1]">
            View all prompts
          </a>
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="min-w-0">
          <PromptGrid prompts={paginatedItems} variant="grid" />
          {totalPages > 1 ? (
            <div className="mt-10 rounded-lg border border-slate-200 bg-white">
              <Pagination
                currentPage={validPage}
                totalPages={totalPages}
                totalItems={latestItems.length}
                itemsPerPage={HOME_ITEMS_PER_PAGE}
                onPageChange={undefined}
                onItemsPerPageChange={undefined}
                itemLabel="posts"
                baseUrl="/"
                queryParams={{}}
              />
            </div>
          ) : null}
        </div>
        <BlogSidebar promptCount={imageItems.length} workflowCount={videoWorkflows.length} />
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
    <section className="border-t border-slate-200 py-12">
      <div className="mb-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#2271b1]">Topics</p>
            <h2 className="mb-2 text-3xl font-bold text-slate-950">Browse by category</h2>
            <p className="max-w-2xl text-base leading-7 text-slate-600">
              Jump into categories tailored for portraits, landscapes, product shots, sci-fi art, and more.
            </p>
          </div>
          <a href="/categories" className="inline-flex h-11 items-center justify-center rounded-md border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-800 transition hover:border-[#2271b1] hover:text-[#2271b1]">
            Explore categories
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
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

export default function HomePage({
  searchParams,
}: {
  searchParams?: { page?: string | string[] };
}) {
  const currentPage = parsePageParam(searchParams?.page);

  return (
    <div className="min-h-screen bg-[#f6f7f8]">
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
        <LatestSection currentPage={currentPage} />
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
      <section className="border-t border-slate-200 py-12">
        <div className="grid gap-5 sm:grid-cols-3">
          <FeatureCard
            title="Optimized Prompts"
            description="Each prompt is tested and optimized for maximum quality and consistency across all AI models."
          />
          <FeatureCard
            title="Creative Styles"
            description="Explore thousands of unique styles, from cinematic to illustration, product to portrait photography."
          />
          <FeatureCard
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
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6">
      <h3 className="mb-2 text-lg font-bold text-slate-950">{title}</h3>
      <p className="text-sm leading-7 text-slate-600">{description}</p>
    </div>
  );
}

function BlogSidebar({
  promptCount,
  workflowCount,
}: {
  promptCount: number;
  workflowCount: number;
}) {
  return (
    <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
      <div className="rounded-lg border border-slate-200 bg-white p-5">
        <h2 className="border-b border-slate-200 pb-3 text-base font-bold text-slate-950">About this blog</h2>
        <p className="mt-4 text-sm leading-7 text-slate-600">
          PhotoPromptsHub publishes practical AI photo prompt ideas for creators, editors, and social media designers.
        </p>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-5">
        <h2 className="border-b border-slate-200 pb-3 text-base font-bold text-slate-950">Library stats</h2>
        <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-md bg-slate-50 p-3">
            <dt className="text-slate-500">Prompts</dt>
            <dd className="mt-1 text-xl font-bold text-slate-950">{promptCount}</dd>
          </div>
          <div className="rounded-md bg-slate-50 p-3">
            <dt className="text-slate-500">Workflows</dt>
            <dd className="mt-1 text-xl font-bold text-slate-950">{workflowCount}</dd>
          </div>
        </dl>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-5">
        <h2 className="border-b border-slate-200 pb-3 text-base font-bold text-slate-950">Quick links</h2>
        <nav className="mt-4 grid gap-2 text-sm font-semibold">
          <a href="/latest" className="text-slate-700 hover:text-[#2271b1]">Latest posts</a>
          <a href="/trending" className="text-slate-700 hover:text-[#2271b1]">Trending prompts</a>
          <a href="/categories" className="text-slate-700 hover:text-[#2271b1]">Prompt categories</a>
          <a href="/collections" className="text-slate-700 hover:text-[#2271b1]">Collections</a>
        </nav>
      </div>
    </aside>
  );
}
