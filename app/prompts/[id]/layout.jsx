import { getPromptById, getAllPromptIds } from "@/src/lib/data";
import { SITE_URL } from "@/src/config";

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  const ids = await getAllPromptIds();
  return ids.map((id) => ({
    id: String(id),
  }));
}

export async function generateMetadata({ params }) {
  try {
    const prompt = await getPromptById(params.id);

    if (!prompt) {
      return {
        title: "Prompt Not Found - PhotoPromptsHub",
      };
    }

    const canonicalUrl = prompt.slug ? `${SITE_URL}/prompt/${prompt.slug}` : `${SITE_URL}/prompts/${prompt.id}`;
    const title = `${prompt.title} | ${prompt.model} Prompt - PhotoPromptsHub`;
    const description = `${prompt.title} - Copy this ${prompt.model} prompt for ${prompt.category}. ${(prompt.prompt || "").substring(0, 100)}...`;
    const image = prompt.previewImage || `${SITE_URL}/og-image.jpg`;

    return {
      title,
      description,
      keywords: [...(prompt.tags || []), prompt.model, prompt.category].join(", "),
      openGraph: {
        title: prompt.title,
        description: (prompt.prompt || "").substring(0, 160),
        images: [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: prompt.title,
          },
        ],
        url: canonicalUrl,
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: prompt.title,
        description: (prompt.prompt || "").substring(0, 120),
        images: [image],
      },
      // Point canonical to the slug-based URL
      canonical: canonicalUrl,
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Prompt - PhotoPromptsHub",
    };
  }
}

export default function PromptLayout({ children }) {
  return children;
}
