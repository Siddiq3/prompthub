import { getPromptBySlug, getAllPromptSlugs } from "@/src/lib/data";
import { FALLBACK_OG_IMAGE, SITE_URL } from "@/src/config";

// C-01: Force dynamic rendering for prompt pages
export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  const slugs = await getAllPromptSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = params;
  const prompt = await getPromptBySlug(slug);

  if (!prompt) {
    return {
      title: "Prompt Not Found",
    };
  }

  const canonicalDomain = process.env.NEXT_PUBLIC_SITE_URL || SITE_URL;
  const pageUrl = `${canonicalDomain}/prompt/${prompt.slug}`;
  const keywords = prompt.seo?.keywords || prompt.tags || [];
  const description =
    prompt.seo?.metaDescription ||
    prompt.seoIntro ||
    `${prompt.title} is a ${prompt.category.toLowerCase()} prompt for ${prompt.modelLabel || prompt.model}, ideal for creating polished photo-style imagery with vivid detail.`;

  return {
    title: prompt.seo?.metaTitle || `${prompt.title} — ${prompt.modelLabel || prompt.model} prompt`,
    description,
    keywords: keywords.join(", "),
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: prompt.seo?.metaTitle || `${prompt.title} — ${prompt.modelLabel || prompt.model}`,
      description,
      url: pageUrl,
      type: "article",
      images: [
        {
          url: prompt.previewImage || FALLBACK_OG_IMAGE,
          alt: prompt.title,
        },
      ],
      publishedTime: prompt.createdAt,
      modifiedTime: prompt.updatedAt || prompt.createdAt,
      tags: keywords.slice(0, 5),
    },
    twitter: {
      card: "summary_large_image",
      title: prompt.seo?.metaTitle || `${prompt.title} — ${prompt.modelLabel || prompt.model}`,
      description,
      images: [prompt.previewImage || FALLBACK_OG_IMAGE],
    },
  };
}

export default function PromptLayout({ children }) {
  return children;
}
