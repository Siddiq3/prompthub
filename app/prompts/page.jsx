import { getPrompts } from "@/src/lib/data";
import PromptsClientPage from "./client";

export const dynamic = 'force-dynamic';

export function generateMetadata() {
  return {
    title: "AI Photography Prompts - ChatGPT & Gemini | Browse & Search",
    description: "Browse and search photography prompts optimized for ChatGPT and Gemini AI image generation. Filter by category, style, mood, and creative direction.",
    keywords: "AI photography prompts, ChatGPT prompts, Gemini prompts, portrait prompts, fashion photography, cinematic prompts, lifestyle AI, prompt search",
    alternates: {
      canonical: "https://photopromptshub.in/prompts",
    },
    openGraph: {
      title: "AI Photography Prompts - ChatGPT & Gemini",
      description: "Search photography prompts optimized for ChatGPT and Gemini AI image generation",
      type: "website",
    },
  };
}

export default async function PromptsPage() {
  const prompts = await getPrompts();

  return <PromptsClientPage initialPrompts={prompts} />;
}
