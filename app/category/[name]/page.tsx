import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPrompts } from '@/src/lib/data';
import { generateCategorySEO, generateBreadcrumbSchema, sortPrompts } from '@/src/utils/prompts';
import type { Prompt, PromptCategory } from '@/src/types';
import PromptGrid from '@/src/components/PromptGrid';
import { motion } from 'framer-motion';

export const revalidate = 3600;

const CATEGORIES: Record<string, PromptCategory> = {
  'portrait': 'Portrait',
  'landscape': 'Landscape',
  'product': 'Product',
  'abstract': 'Abstract',
  'architecture': 'Architecture',
  'nature': 'Nature',
  'fashion': 'Fashion',
  'still-life': 'Still Life',
  'animals': 'Animals',
  'fantasy': 'Fantasy',
  'sci-fi': 'Sci-Fi',
  'illustration': 'Illustration',
  'photography': 'Photography',
  'cinematic': 'Cinematic',
};

interface PageProps {
  params: {
    name: string;
  };
  searchParams: {
    sort?: 'newest' | 'trending' | 'popular' | 'random';
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const prompts = await getPrompts();
  const category = CATEGORIES[params.name];

  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }

  const categoryPrompts = prompts.filter((p: Prompt) => p.category === category);
  const seo = generateCategorySEO(category, categoryPrompts.length);

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: seo.canonicalUrl,
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: seo.canonicalUrl,
      type: 'website',
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(CATEGORIES).map((slug) => ({
    name: slug,
  }));
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const prompts = await getPrompts();
  const category = CATEGORIES[params.name];

  if (!category) {
    notFound();
  }

  const categoryPrompts = prompts
    .filter((p: Prompt) => p.category === category)
    .sort((a: Prompt, b: Prompt) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const sortedPrompts = sortPrompts(categoryPrompts, searchParams.sort || 'newest');

  const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Categories', url: '/categories' },
    { label: category, url: `/category/${params.name}` },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
        {/* Breadcrumb */}
        <nav className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <a href="/" className="hover:text-white transition">
                Home
              </a>
              <span>/</span>
              <span className="text-white">{category}</span>
            </div>
          </div>
        </nav>

        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h1 className="text-5xl sm:text-6xl font-black text-white">{category} Prompts</h1>
            <p className="text-xl text-slate-300">
              Discover {categoryPrompts.length} premium {category.toLowerCase()} prompts for Midjourney, DALL-E, Flux & Stable Diffusion
            </p>

            {/* Sort Options */}
            <div className="flex gap-2 pt-8">
              {(['newest', 'trending', 'popular', 'random'] as const).map((sort) => (
                <a
                  key={sort}
                  href={`/category/${params.name}?sort=${sort}`}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
                    (searchParams.sort || 'newest') === sort
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {sort.charAt(0).toUpperCase() + sort.slice(1)}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {sortedPrompts.length > 0 ? (
            <PromptGrid prompts={sortedPrompts} />
          ) : (
            <div className="text-center py-16">
              <p className="text-slate-400 text-lg">No prompts found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
