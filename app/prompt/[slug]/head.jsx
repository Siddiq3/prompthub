import { getPromptBySlug } from "@/src/lib/data";
import { SITE_URL } from "@/src/config";

export default async function Head({ params }) {
  const { slug } = params;
  const prompt = await getPromptBySlug(slug);

  if (!prompt) {
    return null;
  }

  const pageUrl = `${process.env.NEXT_PUBLIC_SITE_URL || SITE_URL}/prompt/${prompt.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: prompt.title,
    description: prompt.seo?.metaDescription || prompt.seoIntro || prompt.title,
    image: prompt.previewImage || undefined,
    datePublished: prompt.createdAt,
    dateModified: prompt.updatedAt || prompt.createdAt,
    author: {
      "@type": "Person",
      name: prompt.author || "PhotoPromptsHub",
    },
    publisher: {
      "@type": "Organization",
      name: "PhotoPromptsHub",
      url: "https://photopromptshub.in",
    },
    keywords: (prompt.seo?.keywords || prompt.tags || []).join(", "),
    mainEntityOfPage: pageUrl,
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  );
}
