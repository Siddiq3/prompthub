import { getPromptBySlug } from "@/src/lib/data";
import { SITE_URL } from "@/src/config";

const cleanText = (value) => (typeof value === "string" ? value.trim() : "");

const cleanTextArray = (items = []) =>
  Array.isArray(items)
    ? items.map((item) => cleanText(item)).filter(Boolean)
    : [];

const cleanFaqItems = (items = []) =>
  Array.isArray(items)
    ? items
        .filter((item) => item && (item.question || item.answer))
        .map((item) => ({
          question: cleanText(item.question),
          answer: cleanText(item.answer),
        }))
        .filter((item) => item.question && item.answer)
    : [];

const countWords = (items = []) =>
  items
    .filter(Boolean)
    .join(" ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

export default async function Head({ params }) {
  const { slug } = params;
  const prompt = await getPromptBySlug(slug);

  if (!prompt) {
    return null;
  }

  const pageUrl = `${process.env.NEXT_PUBLIC_SITE_URL || SITE_URL}/prompt/${prompt.slug}`;
  const faqItems = cleanFaqItems(prompt.faqItems).length
    ? cleanFaqItems(prompt.faqItems)
    : cleanFaqItems(prompt.faq);
  const wordCount = countWords([
    prompt.title,
    prompt.intro || prompt.seoIntro,
    ...cleanTextArray(prompt.about_paragraphs),
    prompt.what_is_paragraph,
    prompt.what_is_closing_paragraph,
    prompt.prompt,
    prompt.negativePrompt,
    ...cleanTextArray(prompt.howToSteps),
    ...cleanTextArray(prompt.tips?.length ? prompt.tips : prompt.prompt_tips),
    prompt.who_is_it_for,
    prompt.how_it_works,
    ...faqItems.flatMap((item) => [item.question, item.answer]),
  ]);
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
    wordCount,
    mainEntityOfPage: pageUrl,
  };
  const faqSchema = faqItems.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }
    : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {faqSchema ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      ) : null}
    </>
  );
}
