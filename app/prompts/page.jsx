import { Suspense } from "react";
import { getPrompts } from "@/src/lib/data";
import PromptsClientPage from "./client";
import { PromptsSkeleton } from "@/src/components/PromptsSkeleton";

// C-01: Enable ISR (revalidate every hour) for SEO indexing
export const revalidate = 3600;

export const metadata = {
  title: "Browse Prompts - PhotoPromptsHub",
  description: "Browse and search AI image prompts by category, model, style, and more.",
};

export default async function PromptsPage() {
  const prompts = await getPrompts();

  return (
    <Suspense fallback={<PromptsSkeleton />}>
      <PromptsClientPage initialPrompts={prompts} />
    </Suspense>
  );
}
