import { redirect, notFound } from "next/navigation";
import PromptDetailsPage from "../../prompt/[slug]/page.jsx";
import { getPromptById, getPromptBySlug } from "@/src/lib/data";

/**
 * /prompts/[id] Page - Supports both ID-based and slug-based prompt URLs.
 *
 * This page renders prompt content for /prompts/{slug} and redirects
 * canonical ID-based URLs to /prompt/{slug}.
 */
export default async function PromptDetailsAliasPage({ params }) {
  const identifier = params.id;
  const promptById = await getPromptById(identifier);

  if (promptById) {
    if (promptById.slug) {
      redirect(`/prompt/${promptById.slug}`);
    }
    notFound();
  }

  const promptBySlug = await getPromptBySlug(identifier);
  if (promptBySlug) {
    return <PromptDetailsPage params={{ slug: promptBySlug.slug }} />;
  }

  notFound();
}
