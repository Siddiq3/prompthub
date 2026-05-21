import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPrompts } from '@/src/lib/data';
import { getCategories } from '@/src/lib/content';
import { generateCategorySEO, generateBreadcrumbSchema } from '@/src/utils/prompts';
import type { Prompt } from '@/src/types';
import CategoryPromptBrowser from '@/src/components/CategoryPromptBrowser';

export const revalidate = 3600;

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
  const allCategories = getCategories(prompts);
  const category = allCategories.find(c => c.slug === params.name || c.name.toLowerCase().replace(/\s+/g, '-') === params.name);

  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }

  const categoryPrompts = prompts.filter((p: Prompt) => p.category === category.name);
  const seo = generateCategorySEO(category.name, categoryPrompts.length);

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
  const prompts = await getPrompts();
  const allCategories = getCategories(prompts);
  
  return allCategories.map((category) => ({
    name: category.slug || category.name.toLowerCase().replace(/\s+/g, '-'),
  }));
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const prompts = await getPrompts();
  const allCategories = getCategories(prompts);
  const category = allCategories.find(c => c.slug === params.name || c.name.toLowerCase().replace(/\s+/g, '-') === params.name);

  if (!category) {
    notFound();
  }

  const categoryPrompts = prompts.filter((p: Prompt) => p.category === category.name);
  const categorySlug = category.slug || category.name.toLowerCase().replace(/\s+/g, '-');
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://photopromptshub.in';
  const categoryUrl = `${baseUrl}/category/${categorySlug}`;
  
  const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Categories', url: '/categories' },
    { label: category.name, url: `/category/${categorySlug}` },
  ];
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": categoryUrl,
    "name": `${category.name} AI Prompts - PhotoPromptsHub`,
    "description": `Browse ${categoryPrompts.length} ${category.name.toLowerCase()} AI image prompts for Midjourney, DALL·E, Flux, and Stable Diffusion. Find the perfect ${category.name.toLowerCase()} prompt for your creative project.`,
    "url": categoryUrl,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": categoryPrompts.length,
      "itemListElement": categoryPrompts.slice(0, 10).map((prompt, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": prompt.title,
        "url": `${baseUrl}/prompt/${prompt.slug}`,
        "image": prompt.previewImage,
      })),
    },
    "creator": {
      "@type": "Organization",
      "name": "PhotoPromptsHub",
      "url": baseUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <CategoryPromptBrowser category={category.name} prompts={categoryPrompts} />
    </>
  );
}
