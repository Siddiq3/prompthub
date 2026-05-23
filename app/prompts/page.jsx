import { Suspense } from "react";
import { getPrompts } from "@/src/lib/data";
import PromptsClientPage from "./client";
import { PromptsSkeleton } from "@/src/components/PromptsSkeleton";

export const dynamic = 'force-dynamic';

export function generateMetadata() {
  return {
    title: "Browse AI Prompts - PhotoPromptsHub | Search Thousands of Prompts",
    description: "Explore and search our collection of thousands of AI image prompts for Midjourney, DALL·E, Flux, and Stable Diffusion. Filter by category, model, style, and tags.",
    keywords: "search ai prompts, browse prompts, midjourney search, flux prompts, dall-e search, stable diffusion prompts, prompt search engine",
    alternates: {
      canonical: "https://photopromptshub.in/prompts",
    },
    openGraph: {
      title: "Browse AI Prompts - PhotoPromptsHub",
      description: "Search and filter thousands of AI image prompts",
      type: "website",
    },
  };
}

export default async function PromptsPage() {
  const prompts = await getPrompts();

  return (
    <Suspense fallback={<PromptsSkeleton />}>
      <PromptsClientPage initialPrompts={prompts} />
    </Suspense>
  );
}
