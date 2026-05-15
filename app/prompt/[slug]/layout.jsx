import { getPrompts, getAllPromptSlugs } from "@/src/lib/data";

export async function generateStaticParams() {
  const slugs = await getAllPromptSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = params;
  const prompts = await getPrompts();
  const prompt = prompts.find((p) => p.slug === slug);

  if (!prompt) {
    return {
      title: "Prompt Not Found",
    };
  }

  const description =
    prompt.description ||
    `${prompt.title} - AI image prompt for ${prompt.modelLabel}`;

  return {
    title: `${prompt.title} - ${prompt.modelLabel} Prompt`,
    description,
    openGraph: {
      title: `${prompt.title} - ${prompt.modelLabel}`,
      description,
      images: prompt.previewImage ? [{ url: prompt.previewImage }] : [],
    },
  };
}

export default function PromptLayout({ children }) {
  return children;
}
