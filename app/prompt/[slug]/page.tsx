import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import PromptDetail from '@/src/components/PromptDetail';
import { getPrompts } from '@/src/lib/data';
import { generatePromptSEO, generatePromptSchema, getRelatedPrompts } from '@/src/utils/prompts';
import type { Prompt } from '@/src/types';

// Enable ISR with 1 hour revalidation
export const revalidate = 3600;

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const prompts = await getPrompts();
  const prompt = prompts.find((p: Prompt) => p.slug === params.slug);

  if (!prompt) {
    return {
      title: 'Prompt Not Found',
      description: 'The prompt you are looking for does not exist.',
    };
  }

  const seo = generatePromptSEO(prompt);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://photopromptshub.in';

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
      images: [
        {
          url: seo.ogImage || '',
          width: 1200,
          height: 630,
          alt: prompt.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: [seo.ogImage || ''],
    },
    authors: [{ name: 'PhotoPromptsHub' }],
    creator: 'PhotoPromptsHub',
    publisher: 'PhotoPromptsHub',
  };
}

export async function generateStaticParams() {
  const prompts = await getPrompts();
  return prompts.map((prompt: Prompt) => ({
    slug: prompt.slug,
  }));
}

export default async function PromptPage({ params }: PageProps) {
  const prompts = await getPrompts();
  const prompt = prompts.find((p: Prompt) => p.slug === params.slug);

  if (!prompt) {
    notFound();
  }

  const relatedPrompts = getRelatedPrompts(prompt, prompts);

  // Generate JSON-LD schema
  const schema = generatePromptSchema(prompt);

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Page Content */}
      <PromptDetail prompt={prompt} relatedPrompts={relatedPrompts} />
    </>
  );
}
