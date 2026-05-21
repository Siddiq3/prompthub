import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPrompts } from '@/src/lib/data';
import { generateCategorySEO, generateBreadcrumbSchema } from '@/src/utils/prompts';
import type { Prompt, PromptCategory } from '@/src/types';
import CategoryPromptBrowser from '@/src/components/CategoryPromptBrowser';

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

  const categoryPrompts = prompts.filter((p: Prompt) => p.category === category);
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
      <CategoryPromptBrowser category={category} prompts={categoryPrompts} />
    </>
  );
}
