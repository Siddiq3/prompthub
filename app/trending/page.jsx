import { getTrendingPrompts } from "@/src/lib/content";
import { getPrompts } from "@/src/lib/data";
import PromptCard from "@/src/components/PromptCard";

export function generateMetadata() {
  return {
    title: "Trending Prompts - PhotoPromptsHub",
    description: "The most popular and trending AI image prompts right now.",
  };
}

export default async function TrendingPage() {
  const prompts = await getPrompts();
  const trendingPrompts = getTrendingPrompts(prompts, 50);

  return (
    <>
      <div className="mb-8">
        <h1 className="mb-4 text-4xl font-bold">Trending Prompts</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          The most popular AI image prompts from our community right now
        </p>
      </div>

      {trendingPrompts.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {trendingPrompts.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-slate-600 dark:text-slate-400">
            No prompts available at the moment.
          </p>
        </div>
      )}
    </>
  );
}
