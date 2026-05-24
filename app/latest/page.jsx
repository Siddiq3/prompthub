import { getLatestPrompts } from "@/src/lib/content";
import { getPrompts } from "@/src/lib/data";
import PromptCard from "@/src/components/PromptCard";

export function generateMetadata() {
  return {
    title: "Latest Photography Prompts - New Ideas for ChatGPT & Gemini",
    description: "Discover the newest photography prompts added to our library. Fresh, creative ideas for ChatGPT and Gemini AI image generation.",
    keywords: "new photography prompts, latest AI prompts, fresh prompts, newest prompts, recent photography ideas, ChatGPT latest, Gemini latest",
    alternates: {
      canonical: "https://photopromptshub.in/latest",
    },
    openGraph: {
      title: "Latest Photography Prompts - New Creative Ideas",
      description: "Discover the newest photography prompts for AI image generation",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Latest Photography Prompts",
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
