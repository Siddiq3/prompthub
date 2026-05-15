import Link from "next/link";
import { buildCollectionHighlights } from "@/src/lib/content";
import { getPrompts } from "@/src/lib/data";

export const metadata = {
  title: "Collections - PhotoPromptsHub",
  description: "Browse curated prompt collections for specific use cases and styles.",
};

export default async function CollectionsPage() {
  const prompts = await getPrompts();
  const collections = buildCollectionHighlights(prompts, 50);

  return (
    <>
      <div className="mb-8">
        <h1 className="mb-4 text-4xl font-bold">Prompt Collections</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Hand-picked prompt collections for specific use cases and visual styles
        </p>
      </div>

      {collections.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((collection) => (
            <Link
              key={collection.slug}
              href={`/collection/${collection.slug}`}
              className="group rounded-lg border border-slate-200 p-6 transition-all hover:border-brand-primary hover:shadow-lg dark:border-slate-700"
            >
              <h3 className="mb-2 text-xl font-semibold group-hover:text-brand-primary">
                {collection.title}
              </h3>
              <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
                {collection.description}
              </p>
              <p className="text-sm font-medium text-brand-primary">
                View Collection →
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-slate-600 dark:text-slate-400">
            No collections available at the moment.
          </p>
        </div>
      )}
    </>
  );
}
