import { getLatestPrompts } from "@/src/lib/content";
import { getPrompts } from "@/src/lib/data";
import PromptCard from "@/src/components/PromptCard";

export function generateMetadata() {
  return {
    title: "Latest AI Prompts - New Prompts for Midjourney, DALL·E, Flux & More",
    description: "Discover the newest AI image prompts added to PhotoPromptsHub. Fresh prompts for Midjourney, DALL·E, Flux, and Stable Diffusion. Recently added by our community.",
    keywords: "new ai prompts, latest prompts, fresh prompts, newest midjourney prompts, recent ai image prompts, trending new prompts",
    alternates: {
      canonical: "https://photopromptshub.in/latest",
    },
    openGraph: {
      title: "Latest AI Prompts - Fresh & New Prompts",
      description: "Discover the newest AI image prompts for creative projects",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Latest AI Prompts",
      description: "Fresh AI image prompts added daily",
    },
  };
}

export default async function LatestPage() {
  const prompts = await getPrompts();
  const latestPrompts = getLatestPrompts(prompts, 50);

  return (
    <>
      <div className="mb-8">
        <h1 className="mb-4 text-4xl font-bold">Latest Prompts</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Recently added AI image prompts for all your creative projects
        </p>
      </div>

      {latestPrompts.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latestPrompts.map((prompt) => (
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
