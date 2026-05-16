import { getPromptBySlug, getAllPromptSlugs } from "@/src/lib/data";
import { FALLBACK_OG_IMAGE, SITE_URL } from "@/src/config";

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

  const url = `${SITE_URL}/prompt/${prompt.slug}`;
  const description =
    prompt.seoIntro ||
    `${prompt.title} is a ${prompt.category.toLowerCase()} prompt for ${prompt.modelLabel}, ideal for creating polished photo-style imagery with vivid detail.`;

  return {
    title: `${prompt.title} — ${prompt.modelLabel} prompt`,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${prompt.title} — ${prompt.modelLabel}`,
      description,
      url,
      images: [
        {
          url: prompt.previewImage || FALLBACK_OG_IMAGE,
          alt: prompt.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${prompt.title} — ${prompt.modelLabel}`,
      description,
      images: [prompt.previewImage || FALLBACK_OG_IMAGE],
    },
  };
}

export default function PromptLayout({ children }) {
  return children;
}
