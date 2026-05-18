import { redirect, notFound } from "next/navigation";
import { getPromptById } from "@/src/lib/data";

/**
 * /prompts/[id] Page - Redirects to canonical slug-based URL
 * 
 * This page handles ID-based URLs and redirects them to the canonical
 * slug-based URLs for optimal SEO. All actual content rendering happens
 * at /prompt/[slug] which is the canonical URL.
 */
export default async function PromptIdPage({ params }) {
  const prompt = await getPromptById(params.id);

  if (!prompt) {
    notFound();
  }

  // Redirect to canonical slug-based URL for better SEO
  // e.g., /prompts/p0200 → /prompt/ipl-style-cricket-jersey-portrait
  if (prompt.slug) {
    redirect(`/prompt/${prompt.slug}`);
  }

  // Fallback: if no slug available, show 404
  return notFound();
}
